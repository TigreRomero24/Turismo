from django.db import models

# Create your models here.
class Amazonia(models.Model):
    titulo = models.CharField(max_length=200, blank=False, null=False, verbose_name="Título")
    direccion = models.CharField(max_length=300, blank=False, null=False, verbose_name="Dirección")
    descripcion = models.TextField(blank=False, null=False, verbose_name="Descripción")
    imagen = models.ImageField(upload_to='imgamazonia', verbose_name="Imagen")