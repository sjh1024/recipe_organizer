from rest_framework import serializers

from .models import RecipeType, RecipeRequirement, Ingredient, IngredientType, RecipeIngredient

class RecipeTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = RecipeType
        fields = ("recipe_type_id", "recipe_type_name")
        
        
class RecipeRequirementSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RecipeRequirement
        fields = ("recipe_type_id", "ing_type_id", "required")


################################################################

class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ("ingredient_id", "ingredient_name")


class IngredientTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = IngredientType
        fields = ("ingredient_type_name")