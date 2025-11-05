"""
URL configuration for aplicacion_web project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from aplicaciones.turismo.views import *

urlpatterns = [
    path('', IndexView.as_view(), name='inicio'),
    path('admin/', admin.site.urls),
    path('historia/', HistoriaView.as_view(), name='historia'),
    path('amazonia/', AmazoniaView.as_view(), name='amazonia'),
    path('costa/', CostaView.as_view(), name='costa'),
    path('galapagos/', GalapagosView.as_view(), name='galapagos'),
    path('sierra/', SierraView.as_view(), name='sierra'),

    # API 
    path('api/registrar_reserva/', registrar_reserva, name='registrar_reserva'),
    path('api/registrar_usuario/', registrar_usuario, name='registrar_usuario'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)