"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredientTypeData, setIngredientTypeData] = useState([]);
  const [currentIngName, setCurrentIngName] = useState("");
  const [currentIngTypeId, setCurrentIngTypeId] = useState("");
  const [formulaList, setFormulaList] = useState([]);
  const [selectedFormula, setSelectedFormula] = useState("");
  const [selectedFormulaId, setSelectedFormulaId] = useState("");
  const [selectedIngredientType, setSelectedIngredientType] = useState("");
  const [loadingFormulas, setLoadingFormulas] = useState(true);
  const [error, setError] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  // Fetch formulas on mount

  useEffect(() => {
    axios.get("http://localhost:8000/api/formulas/")
      .then((response) => {
        setFormulaList(response.data);
        console.log(response.data);
        setLoadingFormulas(false);
      })
      .catch((err) => {
        console.error("Error fetching formulas:", err);
        setError("Failed to load formulas");
        setLoadingFormulas(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:8000/api/submit_recipe';

    const formData = {
      recipe_name: recipeName,
      ingredientTypeData: ingredientTypeData,
      recipe_type_id: selectedFormulaId
    };
    console.log(formData);

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

    setIngredientTypeData(prev =>
      prev.map((item) =>
        item.ingredient_type_id === currentIngTypeId
          ? {
            ...item,
            ingredient_list: [...item.ingredient_list, trimmedName],
          }
          : item
      )
    );

    console.log(currentIngTypeId);
    console.log(trimmedName);

    console.log(ingredientTypeData);

    setCurrentIngName("");
    setCurrentIngTypeId("");
  };

  const handleFormulaChange = (e) => {
    const formulaId = e.target.value;
    setSelectedFormulaId(formulaId);

    const selectedFormulaObject = formulaList.find(
      (f) => String(f.formula_id) === String(formulaId)
    );

    if (!selectedFormulaObject) {
      console.error("Selected formula not found in the formula list.");
      return;
    }


    const parts = selectedFormulaObject.recipeFormulaParts || [];

    // Generate ingredient type list (give fallback ID if not available)
    const ingredientTypes = parts.map((part, index) => ({
      ingredient_type_id: `${index}`,
      ingredient_type_name: part.ing_type_name,
      ingredient_list: []
    }));
    setIngredientTypeData(ingredientTypes);

    const initialized = ingredientTypes.reduce((acc, item) => {
      acc[item.ingredient_type_id] = {
        ingredient_type_name: item.ingredient_type_name,
        ingredient_list: []
      };
      return acc;
    }, {});
    console.log(initialized);
    setRecipeIngredients(initialized);
    console.log(recipeIngredients);


  }

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="recipename">Recipe Name:</label>
        <input
          type="text"
          id="recipename"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <label htmlFor="formula">Recipe Formula:</label>
        {loadingFormulas ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (

          <select
            id="formula"
            value={selectedFormulaId}
            onChange={handleFormulaChange}
          >

            {selectedFormulaId === "" && (
              <option value="">Select a Formula</option>
            )}

            {formulaList.map((formula, index) => (
              <option key={index} value={formula.formula_id}>{formula.formula_name}</option>
            ))}
          </select>

        )}

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
        {Object.entries(ingredientTypeData).map(([typeId, typeData]) => (
          <div key={typeId}>
            <h4>{typeData.ingredient_type_name}</h4>
            {<ul>
              {typeData.ingredient_list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            }
          </div>

        ))}
      </div>
    </div>
  );
};

export default RecipeForm;
