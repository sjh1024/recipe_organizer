# Generated by Django 5.1 on 2024-08-30 02:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("recipes", "0002_rename_recipeingredients_recipeingredient"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="ingredienttype",
            name="ingredient",
        ),
        migrations.AddField(
            model_name="ingredienttype",
            name="ing_type_multiple",
            field=models.BooleanField(
                default=False, verbose_name="Multiple of this Ingredient Allowed?"
            ),
        ),
        migrations.AddField(
            model_name="ingredienttype",
            name="ing_type_required",
            field=models.BooleanField(
                default=True, verbose_name="Required by Formula?"
            ),
        ),
        migrations.AlterField(
            model_name="ingredienttype",
            name="ing_type_name",
            field=models.CharField(max_length=200, verbose_name="Ingredient Type Name"),
        ),
        migrations.AlterField(
            model_name="ingredienttype",
            name="recipe_type_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="formula_ingredients",
                to="recipes.Formula",
                verbose_name="Related Recipe Formula",
            ),
        ),
        migrations.AlterField(
            model_name="Formula",
            name="recipe_type_name",
            field=models.CharField(max_length=100, verbose_name="Recipe Formula Name"),
        ),
        migrations.DeleteModel(
            name="RecipeRequirement",
        ),
    ]