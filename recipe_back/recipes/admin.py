from django.contrib import admin

from .models import Ingredient, Formula, Recipe, IngredientType, RecipeIngredient

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Formula)
admin.site.register(IngredientType)