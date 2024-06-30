from rest_framework import serializers

from .models import RecipeType, Ingredient, IngredientType, RecipeIngredient


class IngredientTypeSerializer(serializers.ModelSerializer):
    required = serializers.BooleanField(write_only=True) # temp field to handle requirement

    class Meta:
        model = IngredientType
        fields = ["ingredient_type_name", "required"]

   
class RecipeTypeSerializer(serializers.ModelSerializer):
    formula_ingredient_types = IngredientTypeSerializer(many=True)
    class Meta:
        model = RecipeType
        fields = ["recipe_type_name"]
    
    def create(self, validated_data):
        formula_ingredient_data = validated_data.pop('recipeIngTypes')
        recipe_formula = RecipeType.objects.create(**validated_data)

        for ingredient_data in formula_ingredient_data:
            IngredientType.objects.create(
                ing_type_id=recipe_formula, 
                **formula_ingredient_data 
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


