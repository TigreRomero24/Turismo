from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class AmazoniaView(TemplateView):
    template_name = "amazonia.html"
