"use client"
import React, {useState} from 'react';
import axios from 'axios';

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
      const initializeIngredientList = () => {
        const ingredientSublists = ingredientTypeData.reduce((acc, item) => {
            acc[item.ingredient_type_id] = {
              ingredient_type_name: item.ingredient_type_name,
              ingredient_list: []
            };
            return acc;
          }, {});
        
          
          return ingredientSublists;

    }

    const [recipeName, setRecipeName] = useState("");
    const [ingredientTypeData, setIngredientTypeData] = useState([
        { ingredient_type_id: "1001", ingredient_type_name: "a" },
        { ingredient_type_id: "1002", ingredient_type_name: "b" },
        { ingredient_type_id: "1003", ingredient_type_name: "c" }
      ]);
    const [currentIngName, setCurrentIngName] = useState(""); 
    const [currentIngType, setCurrentIngType] = useState(""); //ing type should be an object: has a name and an id
    const [currentIngTypeId, setCurrentIngTypeId] = useState("");

    const [ingredientTypeList, setIngredientTypeList] = useState(["a", "b", "c"])

    const [recipeIngredients, setRecipeIngredients] = useState(() => initializeIngredientList());  //list of 2-tuples containing ingredient type id and ingredient type name, ingredient_name
    /*
        const categories = [
            "ingredient_type_id": {
                ingredient_type_name: "Ingredient Type 1",
                ingredient_list: ["item1", "item2"]
            }
        ];
    */

    const [formulaList, setFormulaList] = useState(["1", "2", "3"]);
  

    const [selectedFormula, setSelectedFormula] = useState("");
    const [selectedIngredientType, setSelectedIngredientType] = useState("");
    

    //const [currentIngTypeMultiple, setCurrentIngTypeMultiple] = useState(true);
   
  
    const handleIngredientAddition = (event) => {
        event.preventDefault();
       
        const trimmedIngName = currentIngName.trim();
        const trimmedIngTypeName = currentIngType.trim();
        if(trimmedIngName.length === 0){
            window.alert("Please enter an ingredient type name.")
        }
        else{
      
            const updatedList = {...recipeIngredients};
            
            //no need to check list types since it should be populated whenever you select a Formula.
            console.log(updatedList);
            console.log(updatedList[currentIngTypeId]);
            console.log(currentIngTypeId);
            updatedList[currentIngTypeId] = {
                ingredient_list: [
                    ...updatedList[currentIngTypeId].ingredient_list, trimmedIngTypeName
                ]

            };

            setRecipeIngredients(updatedList);
            setCurrentIngName(""),
            setCurrentIngType("");
            setCurrentIngTypeId(0);
        }
        console.log(ingredientTypeList);
    };

    const handleIngredientTypeChange = (event) => {
        //event.preventDefault();
        setCurrentIngTypeId(event.target.value);
        
        
    
    }



    return (
        <div>

            <form className="form-container" onSubmit={handleSubmit}>
                        {/*Selects from the possible formula types*/}
                     
                        <label htmlFor="formula">Recipe Formula:</label>

                            <select id="formula" value={selectedFormula} onChange={(e) => setSelectedFormula(e.target.value)}>
                            {formulaList.map((formula, index) => (
                             <option key={index} value={formula}>
                                {formula}
                             </option>
                            ))}
                            </select>

                            <label htmlFor="ingredient">Ingredient Name:</label>
                     
                            <input type="text" 
                            id="ingredient"
                            placeholder="Ingredient Name"
                            value={currentIngName} 
                            onChange={(e)=> setCurrentIngName(e.target.value)} />      

                            <label htmlFor="ingredienttype">Ingredient Type:</label>

                            <select id="ingredienttype" value={selectedIngredientType} onChange={(e) => setCurrentIngTypeId(e)}>
                            {ingredientTypeData.map((ingredient, index) => (
                             <option key={index} value={ingredient.ingredient_type_id}>
                                {ingredient.ingredient_type_name}
                             </option>
                            ))}
                            </select>
                                        
                            <button onClick={handleIngredientAddition}>Add Ingredient</button>
              
                        
                
                {<button type="submit">Submit Recipe!</button>}
            </form>

            <div>
            <label htmlFor="ingredienttype">Ingredient Type:</label>

          
            {ingredientTypeList.map((ingredient, index) => (
                
             <div key={index}>
             <h2>{ingredient}</h2>
             <ul>
                       {/* Assuming you have a separate mapping for items related to each ingredient 
                       {itemsByIngredient[ingredient].map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li> // List each item under its respective heading
                    ))}*/}

             </ul>
             </div>
            ))}
        
                
            </div>

        </div>
    );
    
}

export default RecipeForm;