from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import FormulaSerializer, IngredientTypeSerializer 
from .models import Formula

class IndexView(generic.ListView):
    template_name = "recipes/index.html"

class FormulaEntryView(viewsets.ModelViewSet):  
    
    # create serializer class
    serializer_class = FormulaSerializer

    #define variable; populate it with objects
    queryset = Formula.objects.all()

@api_view(['POST'])
def formula_submit(request):
    data = request.data
    print(data)
    # Serializer for recipe type/formula (stores the name)
    serializer = FormulaSerializer(data=request.data)
    print(serializer.is_valid())
    print(serializer.errors)
    print(serializer.validated_data)
    serializer.save()

    return Response({"status": "success"})

@api_view(['POST'])
def recipe_submit(request):
    data = request.data
    print(data)
    # Serializer for recipe type/formula (stores the name)
    serializer = FormulaSerializer(data=request.data)
    print(serializer.is_valid())
    print(serializer.errors)
    print(serializer.validated_data)
    serializer.save()

    return Response({"status": "success"})

# FormulaViewSet is needed to read Formulas into the React frontend
# for new recipe submission.
class FormulaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Formula.objects.all()
    serializer_class = FormulaSerializer