from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.

class GalapagosView(TemplateView):
    template_name = "galapagos.html"
