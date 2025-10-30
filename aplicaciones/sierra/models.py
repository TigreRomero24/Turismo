from django.db import models

# Create your models here.
class Sierra(models.Model):
    titulo = models.CharField(max_length=200, blank=False, null=False, verbose_name="Título")
    direccion = models.CharField(max_length=300, blank=False, null=False, verbose_name="Dirección")
    descripcion = models.TextField(blank=False, null=False, verbose_name="Descripción")
    imagen = models.ImageField(upload_to='imgsierra', verbose_name="Imagen")
    usuario = models.ForeignKey('usuarios.Usuarios', on_delete=models.CASCADE, verbose_name="Usuario")