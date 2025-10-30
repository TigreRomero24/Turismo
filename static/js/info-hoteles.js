document.addEventListener('DOMContentLoaded', function() {
    // Cerrar todas las cajas de información al inicio
    document.querySelectorAll('.info-caja').forEach(function(caja) {
        caja.classList.remove('visible');
    });

    // Manejar los clics en los botones de "Ver hoteles y restaurantes"
    document.querySelectorAll('.info-hoteles').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar todas las otras cajas primero
            document.querySelectorAll('.info-caja').forEach(function(caja) {
                if (caja !== btn.nextElementSibling) {
                    caja.classList.remove('visible');
                }
            });
            
            // Abrir/cerrar la caja actual
            const caja = btn.nextElementSibling;
            caja.classList.toggle('visible');
            
            // Hacer scroll suave hasta la caja si está abierta
            if (caja.classList.contains('visible')) {
                caja.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Cerrar cajas al hacer clic fuera de ellas
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.info-caja') && !e.target.closest('.info-hoteles')) {
            document.querySelectorAll('.info-caja').forEach(function(caja) {
                caja.classList.remove('visible');
            });
        }
    });
});