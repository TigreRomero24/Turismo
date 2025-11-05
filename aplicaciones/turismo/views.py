from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import Lugar, Reserva
import json
from django.views.generic import TemplateView

@csrf_exempt
def registrar_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(username=username, password=password)
            return JsonResponse({'success': True})
        return JsonResponse({'success': False, 'message': 'Usuario ya existe'})

@csrf_exempt
def registrar_reserva(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        lugar_nombre = data.get('lugar')
        total = data.get('total')
        cantidad = data.get('cantidad', 1)

        try:
            usuario = User.objects.get(username=username)
            lugar = Lugar.objects.get(nombre=lugar_nombre)
            reserva = Reserva.objects.create(
                usuario=usuario,
                lugar=lugar,
                total=total,
                cantidad_personas=cantidad
            )
            return JsonResponse({'success': True, 'message': 'Reserva guardada correctamente'})
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Usuario no encontrado'})
        except Lugar.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Lugar no encontrado'})
    return JsonResponse({'success': False, 'message': 'Método no permitido'})

class IndexView(TemplateView):
    template_name = "index.html"

class CostaView(TemplateView):
    template_name = "costa.html"

class SierraView(TemplateView):
    template_name = "sierra.html"

class AmazoniaView(TemplateView):
    template_name = "amazonia.html"

class GalapagosView(TemplateView):
    template_name = "galapagos.html"

class HistoriaView(TemplateView):
    template_name = "historia.html"


