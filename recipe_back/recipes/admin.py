from django.contrib import admin

from .models import Ingredient, RecipeType, Recipe, IngredientType, RecipeIngredient

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(RecipeType)
admin.site.register(IngredientType)