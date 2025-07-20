from rest_framework import serializers

from .models import Formula, Ingredient, IngredientType, RecipeIngredient, Recipe

# serializers.py
#
# This file defines Django REST Framework serializers for various Models. 
# Serializers handle conversion between model instances and JSON for API input/output.
#
# We're using ModelSerializers, which automatically map fields from the specified model.
# The `Meta` inner class is required to specify:
#   - `model`: which Django model this serializer is for
#   - `fields`: which model fields to include (can also use `__all__`)
#
# For nested data (e.g., Formula with IngredientTypes), we override the `create()` method
# to manually create related objects, since DRF does not support nested writes out of the box.
#
# Example:
# class SomeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SomeModel
#         fields = ['field1', 'field2']
#
# Nested serializers like `recipeFormulaParts` and `recipeParts` require special handling
# in the `create()` methods to properly save related objects.


class IngredientTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientType
        fields = ["ing_type_name", "ing_type_required"]

   
class FormulaSerializer(serializers.ModelSerializer):

    recipeFormulaParts = IngredientTypeSerializer(many=True)

    class Meta:
        model = Formula
        fields = ["formula_name", "recipeFormulaParts"]
    
    def create(self, validated_data):
        formula_ingredient_data = validated_data.pop('recipeFormulaParts')
       
        print(f"Validated Data:{validated_data}")
        print(f"Formula Ingredient Data:{formula_ingredient_data}")
        
        # This step creates the actual Formula in the Formula table.
        recipe_formula = Formula.objects.create(**validated_data)
        
        print(f"Recipe Formula: {recipe_formula}")

        # This step creates all the associated Ingredient Types for the Formula.
        for ingredient_data in formula_ingredient_data:
            IngredientType.objects.create(
                formula=recipe_formula, 
                **ingredient_data 
            )
        return recipe_formula

class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ["ingredient_id", "ingredient_name"]



class RecipeSerializer(serializers.ModelSerializer):

    recipeParts = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ["recipe_name", "ingredients"]
    
    def create(self, validated_data):
        recipe_ingredient_data = validated_data.pop('recipeParts')
       
        print(f"Validated Data:{validated_data}")
        print(f"Recipe Ingredient Data:{recipe_ingredient_data}")
        
        recipe = Recipe.objects.create(**validated_data)
        
        print(f"Recipe: {recipe}")
        for ingredient_data in recipe_ingredient_data:
            Ingredient.objects.create(
               # ing_type_id=recipe_formula, 
                **ingredient_data 
            )
        return recipe

