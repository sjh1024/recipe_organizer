from django.shortcuts import render
from django.http import HttpResponse


class IndexView(generic.ListView):
    template_name = "recipes/index.html"
    
