from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from.serializers import RecipeTypeSerializer, IngredientTypeSerializer

from .models import RecipeType

class IndexView(generic.ListView):
    template_name = "recipes/index.html"

class RecipeTypeEntryView(viewsets.ModelViewSet):  
    
    # create serializer class
    serializer_class = RecipeTypeSerializer

    #define variable; populate it with objects
    queryset = RecipeType.objects.all()

@api_view(['POST'])
def formula_submit(request):
    data = request.data
    # print(data)
    # Serializer for recipe type/formula (stores the name)
    serializer = RecipeTypeSerializer(data=request.data)

    return Response({"status": "success"})
