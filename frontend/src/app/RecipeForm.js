"use client"
import React, {useState} from 'react';
import axios from 'axios';
import IngredientList from './IngredientList.js'

/**
 * An IngredientField is an object/field entry item representing an Ingredient in a Recipe.
 * 
 * As such, the Ingredient Field has the following pieces of info:
 * 
 * 1. Ingredient Name
 * 2. Ingredient Type
 * 
 */

/** 
 * 
 * An IngredientList is a list of Ingredients for a specific Recipe of a specific Formula.
 * 
 * It has multiple "lists" of items that come from IngredientFields; some of which can have multiple elements, some that can't (depends on the recipe data).
 * 
 */


const RecipeForm = () => {

    const [recipeName, setRecipeName] = useState("");
    const [currentIngName, setCurrentIngName] = useState("");
    const [currentIngType, setCurrentIngType] = useState("");
    const [currentIngTypeId, setCurrentIngTypeId] = useState(0);
    const [recipeIngredients, setrecipeIngredients] = useState([]);

    const [formulaList, setFormulaList] = useState(["1", "2", "3"]);
    const [selectedFormula, setSelectedFormula] = useState("");
    

    //const [currentIngTypeMultiple, setCurrentIngTypeMultiple] = useState(true);
   

    const handleIngredientAddition = (event) => {
        event.preventDefault();
        const trimmedIngName = currentIngName.trim();
        const trimmedIngTypeName = currentIngType.trim();
        if(trimmedIngName.length === 0){
            window.alert("Please enter an ingredient type name.")
        }
        else{
            const newIngredient = {
                ingredient_name: trimmedIngTypeName,
                ing_type_id: currentIngTypeId.toString(),
            }
            setrecipeIngredients([...recipeIngredients, newIngredient]);
            setCurrentIngName(""),
            setCurrentIngType("");
            setCurrentIngTypeId(0);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://localhost:8000/api/submit_recipe'

        const formData = {
            recipe_name: recipeName,
            ingredients: recipeIngredients,
        };


        // Handle form submission logic, e.g., send data to the server
        console.log('Submitting the recipe formula', recipeIngredients);
        console.log('The recipe formula you submitted is named: ', recipeName);
        
        // Perform the actual submission step
        axios.post(url, formData)
          
            //Make sure that, on that page, if you decide to go back,
            //the old data is still there. 

            .then(response => {
                console.log('Form data sent successfully:', response.data);
                // Reset states

                setRecipeName("");
                setCurrentIngName("");
                setCurrentIngType("");
                setCurrentIngTypeId(0);
                setrecipeIngredients([]);
                
            })
            .catch(error => {
                console.error('Error sending form data:', error);
                // Handle errors, if any
            });

        
        
    
    }

    return (
        <div>

            <form className="form-container" onSubmit={handleSubmit}>
                        {/*Selects from the possible formula types*/}
                     
                        <label for="formula">Recipe Formula:</label>

                            <select id="formula" value={selectedFormula} onChange={(e) => setSelectedFormula(e.target.value)}>
                            {formulaLists.map((formula, index) => (
                             <option key={index} value={formula}>
                                {formula}
                             </option>
                            ))}
                            </select>
                     
                            <input type="text" 
                            id="ingredient"
                            placeholder="Ingredient Name"
                            value={currentIngName} 
                            onChange={(e)=> setCurrentIngName(e.target.value)} />                         
                            <button onClick={handleIngredientAddition}>Add</button>
              
                        
                
                {<button type="submit">Submit Recipe!</button>}
            </form>

        </div>
    );
    
}

export default RecipeForm;