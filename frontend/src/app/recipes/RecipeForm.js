"use client"
import React, { useState, useEffect} from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredientTypeData, setIngredientTypeData] = useState([]);
  const [currentIngName, setCurrentIngName] = useState("");
  const [currentIngTypeId, setCurrentIngTypeId] = useState("");
  const [formulaList, setFormulaList] = useState([]);
  const [selectedFormula, setSelectedFormula] = useState("");
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

  const handleFormulaChange = (e) => {
    const selectedName = e.target.value;
    setSelectedFormula(selectedName);
    
    const selectedFormulaObject = formulaList.find(
        (f) => f.formula_name === selectedName
    );

    if (selectedFormulaObject) {
        const parts = selectedFormulaObject.recipeFormulaParts || [];
        console.log(parts);
        
        // Generate ingredient type list (give fallback ID if not available)
        const ingredientTypes = parts.map((part, index) => ({
            ingredient_type_id: `${index}`,
            ingredient_type_name: part.ing_type_name
        }));
        console.log(ingredientTypes);
        setIngredientTypeData(ingredientTypes);
        console.log(ingredientTypeData);
        /*
        const initialized = ingredientTypes.reduce((acc, item) => {
            acc[item.ingredient_type_id] = {
                ingredient_type_name: item.ingredient_type_name,
                ingredient_list: []
            };
            return acc;
        }, {});
    setRecipeIngredients(initialized);*/
    }
  }

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="formula">Recipe Formula:</label>
        {loadingFormulas ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
       
        <select
          id="formula"
          value={selectedFormula}
          onChange={handleFormulaChange}
        >
          {formulaList.map((formula, index) => (
            <option key={index} value={formula.formula_name}>{formula.formula_name}</option>
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
            {/*} <ul>
              {typeData.ingredient_list.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            */}
          </div>

        ))}
      </div>
    </div>
  );
};

export default RecipeForm;
