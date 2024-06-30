from rest_framework import serializers

from .models import RecipeType, Ingredient, IngredientType, RecipeIngredient


class IngredientTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientType
        fields = ["ing_type_name", "ing_type_required"]

   
class RecipeTypeSerializer(serializers.ModelSerializer):

    recipeIngTypes = IngredientTypeSerializer(many=True)

    class Meta:
        model = RecipeType
        fields = ["recipe_type_name", "recipeIngTypes"]
    
    def create(self, validated_data):
        formula_ingredient_data = validated_data.pop('recipeIngTypes')
       
        print(f"Validated Data:{validated_data}")
        print(f"Formula Ingredient Data:{formula_ingredient_data}")
        
        recipe_formula = RecipeType.objects.create(**validated_data)
        
        print(f"Recipe Formula: {recipe_formula}")
        for ingredient_data in formula_ingredient_data:
            IngredientType.objects.create(
                recipe_type_id=recipe_formula, 
                **ingredient_data 
            )
        return recipe_formula




#class RecipeRequirementSerializer(serializers.ModelSerializer):
    
#    class Meta:
#        model = RecipeRequirement
#        fields = ["recipe_type_id", "ing_type_id", "required"]


################################################################

class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ["ingredient_id", "ingredient_name"]


