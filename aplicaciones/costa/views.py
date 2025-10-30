from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class CostaView(TemplateView):
    template_name = "costa.html"
