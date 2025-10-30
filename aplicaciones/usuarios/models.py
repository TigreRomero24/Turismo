from django.db import models

# Create your models here.
class Usuarios(models.Model):
    nombre = models.CharField(max_length=100, blank=False, null=False, verbose_name="Nombre")
    email = models.EmailField(unique=True, blank=False, null=False, verbose_name="Correo Electrónico")
    password = models.CharField(max_length=100, blank=False, null=False, verbose_name="Contraseña")
    fecha_registro = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Registro")