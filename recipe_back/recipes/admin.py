from django.contrib import admin

from .models import Ingredient, RecipeType, Recipe, IngredientType, RecipeRequirement, RecipeIngredient

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(RecipeType)