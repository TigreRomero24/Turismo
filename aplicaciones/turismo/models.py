from django.db import models
from django.contrib.auth.models import User

class Lugar(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='lugares/', blank=True, null=True)
    ubicacion = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.nombre


class Reserva(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    lugar = models.ForeignKey('Lugar', on_delete=models.CASCADE)
    fecha_reserva = models.DateTimeField(auto_now_add=True)
    cantidad_personas = models.PositiveIntegerField(default=1)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Reserva de {self.usuario.username} - {self.lugar.nombre}"

