from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic

from rest_framework import viewsets
from.serializers import RecipeTypeSerializer

from .models import RecipeType

class IndexView(generic.ListView):
    template_name = "recipes/index.html"

class RecipeTypeEntryView(viewsets.ModelViewSet):  
    
    # create serializer class
    serializer_class = RecipeTypeSerializer

    #define variable; populate it with objects
    queryset = RecipeType.objects.all()