document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userDropdown = document.getElementById('userDropdown');
    const usernameDisplay = userDropdown ? userDropdown.querySelector('.username-display') : null;
    const btnLogout = document.getElementById('btnLogout');
    
    // Configurar eventos de los modales
    if (btnLogin && loginModal) {
        const closeLoginBtn = loginModal.querySelector('.close');
        btnLogin.onclick = () => {
            if (!localStorage.getItem('currentUser')) {
                loginModal.style.display = 'block';
            }
        };
        if (closeLoginBtn) {
            closeLoginBtn.onclick = () => loginModal.style.display = 'none';
        }
    }

    if (btnRegister && registerModal) {
        const closeRegisterBtn = registerModal.querySelector('.close-register');
        btnRegister.onclick = () => registerModal.style.display = 'block';
        if (closeRegisterBtn) {
            closeRegisterBtn.onclick = () => registerModal.style.display = 'none';
        }
    }

    // Cerrar modales al hacer clic fuera
    window.onclick = (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === registerModal) registerModal.style.display = 'none';
        if (userDropdown && !e.target.closest('.user-menu')) {
            userDropdown.style.display = 'none';
        }
    };

    // Función para registrar usuarios
    function registrarUsuario(username, password) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        // Verificar si el usuario ya existe
        if (usuarios.find(u => u.username === username)) {
            return { success: false, message: 'El usuario ya existe' };
        }
        
        // Agregar nuevo usuario
        usuarios.push({ username, password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return { success: true, message: 'Usuario registrado exitosamente' };
    }

    // Función para verificar credenciales
    function verificarCredenciales(username, password) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.find(u => u.username === username && u.password === password);
    }

// Función para mostrar menú de usuario
function showUserMenu(username) {
    if (btnLogin && userDropdown && usernameDisplay && btnLogout) {
        btnLogin.innerHTML = `<i class="fas fa-user"></i> ${username}`;
        usernameDisplay.textContent = `Usuario: ${username}`;
        userDropdown.style.display = 'none';

        let timeoutId;

        // Configurar menú desplegable
        btnLogin.onmouseenter = () => {
            clearTimeout(timeoutId);
            userDropdown.style.display = 'block';
        };

        document.querySelector('.user-menu').onmouseleave = () => {
            timeoutId = setTimeout(() => {
                userDropdown.style.display = 'none';
            }, 300); // 300ms de retraso
        };

        // También agregar eventos para mantener el menú visible mientras el mouse esté sobre él
        userDropdown.onmouseenter = () => {
            clearTimeout(timeoutId);
        };

        // Configurar cierre de sesión
        btnLogout.onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            btnLogin.innerHTML = '<i class="fas fa-user"></i> Iniciar Sesión';
            userDropdown.style.display = 'none';
            toggleRegistroButton(true);
            window.location.reload();
        };
    }
}

// Función para mostrar/ocultar botón de registro
function toggleRegistroButton(mostrar) {
    if (btnRegister) {
        btnRegister.style.display = mostrar ? 'block' : 'none';
    }
}

    // Verificar si hay sesión activa al cargar
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showUserMenu(currentUser);
        toggleRegistroButton(false);
    } else {
        toggleRegistroButton(true);
        btnLogin.innerHTML = '<i class="fas fa-user"></i> Iniciar Sesión';
    }

    // Manejar inicio de sesión
    if (loginForm) {
        loginForm.onsubmit = function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const usernameError = document.getElementById('usernameError');
            const passwordError = document.getElementById('passwordError');

            // Limpiar mensajes de error
            usernameError.textContent = '';
            passwordError.textContent = '';

            // Validaciones
            if (username.length < 3) {
                usernameError.textContent = 'El usuario debe tener al menos 3 caracteres';
                return false;
            }
            if (password.length < 6) {
                passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
                return false;
            }

            // Verificar credenciales
            if (verificarCredenciales(username, password)) {
                localStorage.setItem('currentUser', username);
                loginModal.style.display = 'none';
                showUserMenu(username);
                toggleRegistroButton(false);
            } else {
                passwordError.textContent = 'Usuario o contraseña incorrectos';
            }
        };
    }

    // Manejar registro de usuario
    if (registerForm) {
        registerForm.onsubmit = function(event) {
            event.preventDefault();
            const regUsernameInput = document.getElementById('regUsername');
            const regPasswordInput = document.getElementById('regPassword');
            const regUsernameError = document.getElementById('regUsernameError');
            const regPasswordError = document.getElementById('regPasswordError');
            const regSuccess = document.getElementById('regSuccess');
            
            const username = regUsernameInput.value.trim();
            const password = regPasswordInput.value.trim();

            // Limpiar mensajes de error
            regUsernameError.textContent = '';
            regPasswordError.textContent = '';
            regSuccess.textContent = '';

            // Validaciones
            if (username.length < 3) {
                regUsernameError.textContent = 'El usuario debe tener al menos 3 caracteres';
                return false;
            }
            if (password.length < 6) {
                regPasswordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
                return false;
            }

            // Intentar registro
            const resultado = registrarUsuario(username, password);
            if (resultado.success) {
                regSuccess.textContent = resultado.message;
                registerForm.reset();
                setTimeout(() => {
                    registerModal.style.display = 'none';
                    loginModal.style.display = 'block';
                }, 1500);
            } else {
                regUsernameError.textContent = resultado.message;
            }
        };
    }
});