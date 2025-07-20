from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
# import views from todo
from recipes import views


 
# import routers from the REST framework
# it is necessary for routing
# from rest_framework import routers


router = DefaultRouter()
router.register(r'formulas', views.FormulaViewSet)


# router.register(r'recipe_type_name', views.FormulaEntryView, basename='recipe_type_names')





urlpatterns = [
    path("polls/", include("polls.urls")),
    #path("recipes/", include("recipes.urls")),
    path("admin/", admin.site.urls),

    # add another path to the url patterns
    # when you visit the localhost:8000/api
    # you should be routed to the django Rest framework
    path('api/', include(router.urls)),
    path('api/submit_formula', views.formula_submit, name='submit_formula'),
    path('api/submit_recipe', views.recipe_submit, name='submit_recipe')
]