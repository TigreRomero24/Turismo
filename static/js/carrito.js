// JavaScript para el carrusel de imágenes

// Selecciona todos los carruseles en la página
document.querySelectorAll('.carrusel-js').forEach(function(carrusel) {
  const slides = carrusel.querySelectorAll('.slides-js img');
  let current = 0;

  // Asegurarse de que haya al menos una imagen
  function showSlide(idx) {
    slides.forEach((img, i) => img.classList.toggle('active', i === idx));
  }

  // Mostrar los controles del carrusel
  carrusel.querySelector('.prev').onclick = function() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  };

  carrusel.querySelector('.next').onclick = function() {
    current = (current + 1) % slides.length;
    showSlide(current);
  };

  // Agregar un temporizador para cambiar automáticamente las imágenes
  setInterval(function() {
    current = (current + 1) % slides.length;
    showSlide(current);
    }, 3000);

  // Mostrar la primera imagen al cargar
  showSlide(current);
});


// --- Carrito flotante con localStorage ---

// Agregar paquete al carrito y enviar reserva al servidor Django

function agregarAlCarrito(paquete) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(paquete);
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // --- Enviar reserva al servidor Django ---
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    fetch('/api/registrar_reserva/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUser,
        lugar: paquete.nombre,
        total: paquete.precio,
        cantidad: 4
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Reserva registrada en Django:', data.message);
      } else {
        console.error('Error al registrar reserva:', data.message);
      }
    })
    .catch(err => console.error('Error:', err));
  }
}

// Mostrar el carrito flotante
function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const lista = document.getElementById('carrito-lista');
  lista.innerHTML = '';
  let total = 0;
  carrito.forEach(function(item, index) {
    const li = document.createElement('li');
    li.innerHTML = `<span class='nombre-carrito'>${item.nombre}</span> <span class='precio-carrito'>$${item.precio}</span>`;
    total += parseFloat(item.precio);
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'eliminar-item';
    btnEliminar.onclick = function() {
      eliminarDelCarrito(index);
    };
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
  document.getElementById('carrito-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Remover eventos previos y agregar evento a los botones de adquirir paquete
document.querySelectorAll('.adquirir-paquete').forEach(function(btn) {
  // Primero, removemos todos los event listeners anteriores
  const nuevoBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(nuevoBtn, btn);
  
  // Luego agregamos el nuevo event listener
  nuevoBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const nombre = this.getAttribute('data-nombre');
    const precio = this.getAttribute('data-precio');
    agregarAlCarrito({nombre, precio});
    alert('Paquete agregado al carrito');
  });
});

// Eliminar un paquete del carrito
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Abrir y cerrar el carrito flotante
document.getElementById('abrir-carrito').onclick = function() {
  document.getElementById('carrito-flotante').classList.add('visible');
  mostrarCarrito();
};
document.getElementById('cerrar-carrito').onclick = function() {
  document.getElementById('carrito-flotante').classList.remove('visible');
};