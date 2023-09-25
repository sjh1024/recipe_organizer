from django.shortcuts import render

# Create your views here.
# Views are Python functions or classes that receive a web request and return a web response
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the recipe app index.")

def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)