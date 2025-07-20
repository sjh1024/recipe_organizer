"use client"
import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredientTypeData, setIngredientTypeData] = useState([
    { ingredient_type_id: "1001", ingredient_type_name: "a" },
    { ingredient_type_id: "1002", ingredient_type_name: "b" },
    { ingredient_type_id: "1003", ingredient_type_name: "c" }
  ]);
  const [currentIngName, setCurrentIngName] = useState("");
  const [currentIngTypeId, setCurrentIngTypeId] = useState("");
  const [formulaList, setFormulaList] = useState(["1", "2", "3"]);
  const [selectedFormula, setSelectedFormula] = useState("");
  const [selectedIngredientType, setSelectedIngredientType] = useState("");

  const initializeIngredientList = () => {
    return ingredientTypeData.reduce((acc, item) => {
      acc[item.ingredient_type_id] = {
        ingredient_type_name: item.ingredient_type_name,
        ingredient_list: []
      };
      return acc;
    }, {});
  };

  const [recipeIngredients, setRecipeIngredients] = useState(initializeIngredientList);

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:8000/api/submit_recipe';

    const formData = {
      recipe_name: recipeName,
      recipeIngredients: recipeIngredients,
    };

    axios.post(url, formData)
      .then(response => {
        console.log('Recipe submitted:', response.data);
      })
      .catch(error => {
        console.error('Error submitting recipe:', error);
      });
  };

  const handleIngredientAddition = (event) => {
    event.preventDefault();
    const trimmedName = currentIngName.trim();

    if (!trimmedName) {
      alert("Please enter an ingredient name.");
      return;
    }

    if (!currentIngTypeId || !recipeIngredients[currentIngTypeId]) {
      alert("Please select a valid ingredient type.");
      return;
    }

    setRecipeIngredients(prev => ({
      ...prev,
      [currentIngTypeId]: {
        ...prev[currentIngTypeId],
        ingredient_list: [...prev[currentIngTypeId].ingredient_list, trimmedName]
      }
    }));

    setCurrentIngName("");
    setCurrentIngTypeId("");
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="formula">Recipe Formula:</label>
        <select
          id="formula"
          value={selectedFormula}
          onChange={(e) => setSelectedFormula(e.target.value)}
        >
          {formulaList.map((formula, index) => (
            <option key={index} value={formula}>{formula}</option>
          ))}
        </select>

        <label htmlFor="ingredient">Ingredient Name:</label>
        <input
          type="text"
          id="ingredient"
          placeholder="Ingredient Name"
          value={currentIngName}
          onChange={(e) => setCurrentIngName(e.target.value)}
        />

        <label htmlFor="ingredienttype">Ingredient Type:</label>
        <select
          id="ingredienttype"
          value={currentIngTypeId}
          onChange={(e) => setCurrentIngTypeId(e.target.value)}
        >
          <option value="">Select type</option>
          {ingredientTypeData.map((ingredient, index) => (
            <option key={index} value={ingredient.ingredient_type_id}>
              {ingredient.ingredient_type_name}
            </option>
          ))}
        </select>

        <button onClick={handleIngredientAddition}>Add Ingredient</button>
        <button type="submit">Submit Recipe!</button>
      </form>

      <div>
        <h3>Current Ingredients</h3>
        {Object.entries(recipeIngredients).map(([typeId, typeData]) => (
          <div key={typeId}>
            <h4>{typeData.ingredient_type_name}</h4>
            <ul>
              {typeData.ingredient_list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeForm;
