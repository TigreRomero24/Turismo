from django.shortcuts import render
from django.views.generic import TemplateView, ListView, CreateView, UpdateView, DeleteView
from .models import *

# Create your views here.
class inicio(TemplateView):
    template_name = 'index.html'

class historia(TemplateView):
    template_name = 'historia.html'

