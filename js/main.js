let carrito = [];


window.onload = function() {
    cargarCarritoDesdeLocalStorage();
    actualizarCarrito();
};

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
    mostrarMensaje(`${nombre} agregado al carrito.`);
}

function actualizarCarrito() {
    let total = carrito.reduce((acc, item) => acc + item.precio, 0).toFixed(2);
    let carritoCounter = document.getElementById('carrito-counter');
    let carritoTotal = document.getElementById('carrito-total');
    let carritoLista = document.getElementById('carrito-lista');

    carritoCounter.innerText = carrito.length;
    carritoTotal.innerText = `$${total}`;


    carritoLista.innerHTML = '';
    carrito.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<span>${item.nombre}</span> - $${item.precio.toFixed(2)} <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">&times;</button>`;
        carritoLista.appendChild(li);
    });
}

function mostrarMensaje(texto) {
    let mensaje = document.getElementById('mensaje');
    mensaje.innerText = texto;
    mensaje.style.display = 'block';
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}

function mostrarCarrito() {
    let carritoPopup = document.getElementById('carrito-popup');
    carritoPopup.style.display = 'block';
}

function cerrarCarrito() {
    let carritoPopup = document.getElementById('carrito-popup');
    carritoPopup.style.display = 'none';
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
}

function finalizarCompra() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
    mostrarMensaje('¡Compra realizada con éxito!');
}

function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
    mostrarMensaje('Carrito vaciado.');
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
    let carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}


let tiendaProductos = document.getElementById('tienda-productos');
let productos = [
    { nombre: 'Juguete de Plumas', precio: 12.99 },
    { nombre: 'Pelota Brillante', precio: 8.99 },
    { nombre: 'Túnel de Juego', precio: 19.99 },
    { nombre: 'Torre de Rascado', precio: 29.99 }
];

productos.forEach((producto, index) => {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="recursos/juguete${index + 1}.jpg" alt="${producto.nombre}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
            <button class="btn" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
        </div>
    `;
    tiendaProductos.appendChild(card);
});
