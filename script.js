let loadMoreBtn =document.querySelector('#load-more');
let currentItem = 12;

loadMoreBtn.onclick = () => {

    let boxes = [...document.querySelectorAll('.box-container .box')];
    for(var i = currentItem; i< currentItem + 4; i++) {
        boxes[i].style.display = 'inline-block';
    }
    currentItem += 4;
    if(currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none'
    }
    
}

//carrito

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

cargarEventListerners();

function cargarEventListerners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

}

function comprarElemento(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }

}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento)

}

function insertarCarrito(elemento) {

    const row = document.createElement('tr');
    row.innerHTML = `
    
        <td>
            <img src="${elemento.imagen}" width=100 />
        </td>

        <td>
            ${elemento.titulo}
        </td>

        <td>
            ${elemento.precio}
        </td>

        <td>

            <a href="#" class="borrar" data-id="${elemento.id0}">X</a>

        </td>
    `;

    lista.appendChild(row);

}


function eliminarElemento (e) {

    e.preventDefault();
    let elemento,
        elementoId;

    if(e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = elemento.querySelector('a').getAttribute('data-id');
    }
}


function vaciarCarrito() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}



const options = {
    method: 'POST',
    headers: {
      accept: 'application/vnd.com.payclip.v2+json',
      'content-type': 'application/json',
      'x-api-key': 'Basic NTMzMDg3MTUtNDJiMS00MDk1LWI2NmQtNThkMjQ1MzRkZGQ3OmQ1NTU5ODMyLWVkNzktNGU2Yi05M2ZkLTAyOGJmOWE3ODE0Yw=='
    }
  };
  
fetch('https://api-gw.payclip.com/checkout', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
