// Función para cargar contenido HTML usando innerHTML
function loadHTMLContent(element, content) {
    if (element) {
        element.innerHTML = content;
    }
}

// Función para cargar los layouts
async function loadLayouts() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    const modalContainer = document.getElementById('modal-container');
    
    if (headerContainer) {
        console.log('Cargando header...');
        await loadHTML('layouts/header.html', headerContainer);
        console.log('Header cargado');
    } else {
        console.error('No se encontró el contenedor del header');
    }
    
    if (footerContainer) {
        console.log('Cargando footer...');
        await loadHTML('layouts/footer.html', footerContainer);
        console.log('Footer cargado');
    } else {
        console.error('No se encontró el contenedor del footer');
    }
    
    if (modalContainer) {
        console.log('Cargando modal...');
        await loadHTML('layouts/modal-login.html', modalContainer);
        console.log('Modal cargado');
    } else {
        console.error('No se encontró el contenedor del modal');
    }
}

// Las funciones de carga se manejarán en el evento DOMContentLoaded más abajo

// Asegurarse de que los scripts se recarguen después de cargar los layouts
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Reinicializar scripts después de cargar los layouts
        const loginScript = document.querySelector('script[src="js/login.js"]');
        const carritoScript = document.querySelector('script[src="js/carrito.js"]');
        
        if (loginScript) {
            const newLoginScript = document.createElement('script');
            newLoginScript.src = loginScript.src;
            document.body.appendChild(newLoginScript);
        }
        
        if (carritoScript) {
            const newCarritoScript = document.createElement('script');
            newCarritoScript.src = carritoScript.src;
            document.body.appendChild(newCarritoScript);
        }
    }, 1000); // Esperar 1 segundo después de cargar los layouts
});

document.addEventListener('DOMContentLoaded', function() {
    // HEADER
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <button id="abrir-carrito" class="carrito-boton">
                <i class="fas fa-shopping-cart"></i>
            </button>
            <div id="carrito-flotante" class="carrito-caja">
                <h3>Carrito de paquetes</h3>
                <ul id="carrito-lista"></ul>
                <div id="carrito-total" class="carrito-total"></div>
                <button id="cerrar-carrito">Cerrar</button>
            </div>
            <header>
                <h1>EcuTuris - Agencia de Turismo</h1>
                <p>Explora lo mejor de Ecuador: Costa, Sierra, Amazonía y Galápagos</p>
            </header>
            <nav>
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li>
                        <a href="#">Destinos</a>
                        <ul>
                            <li><a href="costa.html">Costa</a></li>
                            <li><a href="sierra.html">Sierra</a></li>
                            <li><a href="amazonia.html">Amazonía</a></li>
                            <li><a href="galapagos.html">Galápagos</a></li>
                        </ul>
                    </li>
                    <li><a href="historia.html">Historia</a></li>
                    <li><button id="btnRegister" class="login-btn"><i class="fas fa-user-plus"></i> Registrarse </button></li>
                    <li class="user-menu">
                        <button id="btnLogin" class="login-btn"><i class="fas fa-user"></i> Iniciar Sesión</button>
                        <div id="userDropdown" class="dropdown-content">
                            <div class="username-display"></div>
                            <a href="#" id="btnLogout">Cerrar Sesión</a>
                        </div>
                    </li>
                </ul>
            </nav>
        `;
    }

    // FOOTER
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="site-footer">
                <div class="footer-content">
                    <div class="contact-section">
                        <h3>Contáctanos</h3>
                        <form id="contactForm">
                            <div class="form-field">
                                <input type="text" id="contactName" name="name" placeholder="Nombre" required>
                            </div>
                            <div class="form-field">
                                <input type="email" id="contactEmail" name="email" placeholder="Correo electrónico" required>
                            </div>
                            <div class="form-field">
                                <textarea id="contactMessage" name="message" placeholder="Mensaje" required></textarea>
                            </div>
                            <button type="submit" class="boton">Enviar Mensaje</button>
                        </form>
                        <p class="contact-info">¿Tienes preguntas? ¡Estamos aquí para ayudarte!</p>
                    </div>
                    <div class="social-section">
                        <h3>Síguenos en Redes Sociales</h3>
                        <div class="social-links">
                            <a href="https://facebook.com" style="color: white;" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
                            <a href="https://instagram.com" style="color: white;" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                            <a href="https://twitter.com" style="color: white;" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                            <a href="https://youtube.com" style="color: white;" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>© 2025 EcuTuris - Todos los derechos reservados</p>
                </div>
            </footer>
        `;
    }

    // MODAL LOGIN
    if (!document.getElementById('loginModal')) {
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = `
            <div id="loginModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Iniciar Sesión</h2>
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="username">Usuario:</label>
                            <input type="text" id="username" required>
                            <span class="error" id="usernameError"></span>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña:</label>
                            <input type="password" id="password" required>
                            <span class="error" id="passwordError"></span>
                        </div>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }

    // MODAL REGISTER
    if (!document.getElementById('registerModal')) {
        const registerModalDiv = document.createElement('div');
        registerModalDiv.innerHTML = `
            <div id="registerModal" class="modal">
                <div class="modal-content">
                    <span class="close-register">&times;</span>
                    <h2>Registrarse</h2>
                    <form id="registerForm">
                        <div class="form-group">
                            <label for="regUsername">Usuario:</label>
                            <input type="text" id="regUsername" name="username" required>
                            <span class="error" id="regUsernameError"></span>
                        </div>
                        <div class="form-group">
                            <label for="regPassword">Contraseña:</label>
                            <input type="password" id="regPassword" name="password" required>
                            <span class="error" id="regPasswordError"></span>
                        </div>
                        <button type="submit" class="btn-submit">Registrar</button>
                        <div class="success" id="regSuccess"></div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(registerModalDiv);
    }
});