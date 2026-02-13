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

class RecipeIngredientTypeSerializer(serializers.Serializer):
    ingredient_type_id = serializers.CharField()
    ingredient_type_name = serializers.CharField()
    ingredient_list = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )

# TODO: Make separate serializers for submitting and retrieving formulas. 
class FormulaSerializer(serializers.ModelSerializer):

    recipeFormulaParts = IngredientTypeSerializer(source='formula_ingredients', many=True)

    class Meta:
        model = Formula
        fields = ["formula_id", "formula_name", "recipeFormulaParts"]
    
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

   
    ingredientTypeData = RecipeIngredientTypeSerializer(
        many=True,
        write_only=True
    )

    class Meta:
        model = Recipe
        fields = ["recipe_name", "ingredientTypeData", "recipe_type_id"]

    def create(self, validated_data):

        ingredient_type_data = validated_data.pop('ingredientTypeData', [])
        recipe = Recipe.objects.create(**validated_data)

        for type_data in ingredient_type_data:

            ingredient_type_id = type_data.get("ingredient_type_id")
            ingredient_names = type_data.get("ingredient_list", [])

            # get IngredientType
            try:
                ingredient_type = IngredientType.objects.get(pk=ingredient_type_id)
            except IngredientType.DoesNotExist:
                continue

            for ingredient_name in ingredient_names:

                ingredient, created = Ingredient.objects.get_or_create(
                    ingredient_name=ingredient_name
                )

                RecipeIngredient.objects.create(
                    recipe=recipe,
                    ingredient_type=ingredient_type,
                    ingredient=ingredient
                )

        return recipe

