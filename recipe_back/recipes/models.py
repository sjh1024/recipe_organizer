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

# Recipe Type: A recipe "Formula", it has an ID and a name. EXAMPLES: Pizza, Sandwich, Ice Cream, Smoothie...
class RecipeType(models.Model):
    recipe_type_id = models.AutoField(primary_key=True)
    recipe_type_name = models.CharField(max_length=100, verbose_name="Recipe Formula Name")
    def __str__(self):
        return self.recipe_type_name

# Make sure that you find a way to make it "difficult" to delete ingredients...

# Ingredient: A specific "mix-in" of type Ingredient Type that's part of a specific Recipe that is of a Recipe Type. 
# EXAMPLES: Cheddar Cheese, Strawberry Jam, Furikake
class Ingredient(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.CharField(max_length=200)

# Ingredient Type: A specific type of a "mix-in" in a broader category that can be a part of 1 or more recipes. 
# EXAMPLES: Cheese, Sauce, Topping 
class IngredientType(models.Model):
    ing_type_id = models.AutoField(primary_key=True)
    # ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    ing_type_name = models.CharField(max_length=200, verbose_name="Ingredient Type Name")
    recipe_type_id = models.ForeignKey(RecipeType, related_name='formula_ingredients', on_delete=models.CASCADE, verbose_name="Related Recipe Formula")
    ing_type_required = models.BooleanField(default=True, verbose_name="Required by Formula?")
    
    def __str__(self):
        return self.ing_type_name

# Recipe Requirement: A table for storing whether or not an ingredient type is required for a Recipe Type.
# EXAMPLES: For a pizza, "Toppings" may not be required, but "Crust" is required.
# class RecipeRequirement(models.Model):
#    recipe_type_id = models.ForeignKey(RecipeType, on_delete=models.CASCADE)
#    ing_type_id = models.ForeignKey(IngredientType, on_delete=models.CASCADE)
#    required = models.BooleanField()

# Recipe: A FULL, SPECIFIC RECIPE of a specific RECIPE TYPE. 
# EXAMPLES: Buffalo Chicken Pizza, Cookies n Cream Ice Cream, Italian Hero Sandwich
class Recipe(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    recipe_type_id = models.ForeignKey(RecipeType, on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=200)
    # should be a value from 1-5 or 1-10, seems like we cant control that here so must do it elsewhere
    recipe_rating = models.IntegerField()
    recipe_description = models.CharField(max_length=1000)
    recipe_comments = models.CharField(max_length=1000)

# Recipe Ingredient: A specific Ingredient that is tied to a specific Recipe. 
# EXAMPLES: Buffalo Sauce, with a recipe id of "Buffalo Chicken Pizza"
class RecipeIngredient(models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
