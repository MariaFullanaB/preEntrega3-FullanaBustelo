let carrito = [];
let carritoCounter = document.getElementById('carrito-counter');
let carritoLista = document.getElementById('carrito-lista');
let carritoTotal = document.getElementById('carrito-total');
let mensaje = document.getElementById('mensaje');
let carritoPopup = document.getElementById('carrito-popup');

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    mostrarMensaje(`${nombre} agregado al carrito.`);
}

function actualizarCarrito() {
    let total = carrito.reduce((acc, item) => acc + item.precio, 0).toFixed(2);
    carritoCounter.innerText = carrito.length;
    carritoTotal.innerText = `$${total}`;
    mostrarCarrito();
}

function mostrarMensaje(texto) {
    mensaje.innerText = texto;
    mensaje.style.display = 'block';
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}

function mostrarCarrito() {
    carritoLista.innerHTML = '';
    carrito.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<span>${item.nombre}</span> - $${item.precio.toFixed(2)} <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">&times;</button>`;
        carritoLista.appendChild(li);
    });
    carritoPopup.style.display = 'block';
}

function cerrarCarrito() {
    carritoPopup.style.display = 'none';
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function finalizarCompra() {
    carrito = [];
    actualizarCarrito();
    mostrarMensaje('¡Compra realizada con éxito!');
}
