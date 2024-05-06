from django.db import models
from django.forms import ModelForm

# Create your models here.



'''
It's worth noting that, at this point, 
the following fields will cause "cascades" if they are deleted from the database:

1. Ingredients
2. Recipe Types
3. Ingredient Types
4. Recipes

'''

# the models represent the database layout...

class RecipeType(models.Model):
    recipe_type_id = models.AutoField(primary_key=True)
    recipe_type_name = models.CharField(max_length=100)

# Make sure that you find a way to make it "difficult" to delete ingredients...
class Ingredient(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.CharField(max_length=200)

class IngredientType(models.Model):
    ing_type_id = models.AutoField(primary_key=True)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    ing_type_name = models.CharField(max_length=200)
    recipe_type_id = models.ForeignKey(RecipeType, on_delete=models.CASCADE)

class RecipeRequirement(models.Model):
    recipe_type_id = models.ForeignKey(RecipeType, on_delete=models.CASCADE)
    ing_type_id = models.ForeignKey(IngredientType, on_delete=models.CASCADE)
    required = models.BooleanField()

class Recipe(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    recipe_type_id = models.ForeignKey(RecipeType, on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=200)
    # should be a value from 1-5 or 1-10, seems like we cant control that here so must do it elsewhere
    recipe_rating = models.IntegerField()
    recipe_description = models.CharField(max_length=1000)
    recipe_comments = models.CharField(max_length=1000)


class RecipeIngredient(models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
