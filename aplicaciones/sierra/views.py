from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class SierraView(TemplateView):
    template_name = "sierra.html"
