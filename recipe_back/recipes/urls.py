
from django.contrib import admin
 
# add include to the path
from django.urls import path, include
 

# url patterns for connecting the different Django modules.
urlpatterns = [
    path("recipes/", include("recipes.urls")),
    path("admin/", admin.site.urls),
  
]