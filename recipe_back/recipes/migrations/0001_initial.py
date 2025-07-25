# Generated by Django 5.1 on 2025-07-20 17:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Formula",
            fields=[
                ("formula_id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "formula_name",
                    models.CharField(
                        max_length=100, verbose_name="Recipe Formula Name"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="IngredientType",
            fields=[
                ("ing_type_id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "ing_type_name",
                    models.CharField(
                        max_length=200, verbose_name="Ingredient Type Name"
                    ),
                ),
                (
                    "ing_type_required",
                    models.BooleanField(
                        default=False, verbose_name="Required by Formula?"
                    ),
                ),
                (
                    "ing_type_multiple",
                    models.BooleanField(
                        default=True,
                        verbose_name="Multiple of this Ingredient Allowed?",
                    ),
                ),
                (
                    "recipe_type_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="formula_ingredients",
                        to="recipes.formula",
                        verbose_name="Related Recipe Formula",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Ingredient",
            fields=[
                ("ingredient_id", models.AutoField(primary_key=True, serialize=False)),
                ("ingredient_name", models.CharField(max_length=200)),
                (
                    "ing_type_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="recipes.ingredienttype",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Recipe",
            fields=[
                ("recipe_id", models.AutoField(primary_key=True, serialize=False)),
                ("recipe_name", models.CharField(max_length=200)),
                ("recipe_rating", models.IntegerField()),
                ("recipe_description", models.CharField(max_length=1000)),
                ("recipe_comments", models.CharField(max_length=1000)),
                (
                    "recipe_type_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="recipes.formula",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="RecipeIngredient",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "ingredient_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="recipes.ingredient",
                    ),
                ),
                (
                    "recipe_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="recipes.recipe"
                    ),
                ),
            ],
        ),
    ]
