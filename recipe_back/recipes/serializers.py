from rest_framework import serializers

from .models import Formula, Ingredient, IngredientType, RecipeIngredient


class IngredientTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientType
        fields = ["ing_type_name", "ing_type_required"]

   
class FormulaSerializer(serializers.ModelSerializer):

    recipeFormulaParts = IngredientTypeSerializer(many=True)

    class Meta:
        model = Formula
        fields = ["recipe_type_name", "recipeFormulaParts"]
    
    def create(self, validated_data):
        formula_ingredient_data = validated_data.pop('recipeFormulaParts')
       
        print(f"Validated Data:{validated_data}")
        print(f"Formula Ingredient Data:{formula_ingredient_data}")
        
        recipe_formula = Formula.objects.create(**validated_data)
        
        print(f"Recipe Formula: {recipe_formula}")
        for ingredient_data in formula_ingredient_data:
            IngredientType.objects.create(
                recipe_type_id=recipe_formula, 
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

