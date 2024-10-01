/*Need a form type selector*/



/*From here, page will load with appropriate fields*/


"use client"
import React, {useState} from 'react';
import axios from 'axios';

const FormulaForm = () => {

    const [Formula, setFormula] = useState("");
    const [FormulaName, setFormulaName] = useState("");
    const [recipeFormulaParts, setRecipeFormulaParts] = useState([]);
    

    const handleFormulaSelection = (event) => {
        event.preventDefault();
        setRecipeFormulaParts(event.value);
           
    }
   
    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: actually get this hosted somewhere
        const url = 'http://localhost:8000/api/submit_formula'

        const formData = {
            recipe_type_name: FormulaName,
            recipeFormulaParts: recipeFormulaParts,
        };


        // Handle form submission logic, e.g., send data to the server
        console.log('Submitting the recipe', recipeFormulaParts);
        console.log('The recipe you submitted is named: ', FormulaName);
        
        // Perform the actual submission step
        axios.post(url, formData)
            //this needs to change to some sort of success/failure screen
            //I think I want to have a confirmation page first, then submit
            //This would be in handleSubmit, I think, then after you confirm on 
            //THAT page, you submit.

            //Make sure that, on that page, if you decide to go back,
            //the old data is still there. 

            .then(response => {
                console.log('Form data sent successfully:', response.data);
                // Reset states

                setFormulaName("");
                setCurrentIngTypeName("");
                setCurrentIngTypeRequired(false);
                setCurrentIngTypeMultiple(true);
                setrecipeFormulaParts([]);
            })
            .catch(error => {
                console.error('Error sending form data:', error);
                // Handle errors, if any
            });

        
        
    
    }

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="top-panel">
                    
                    <div className= "text-box">
                        <h2>Recipe Formula Name</h2> 
                        <input 
                            type="text" 
                            id="rtype" 
                            className="text-box"
                            value={FormulaName} 
                            onChange={(e)=> setFormulaName(e.target.value)} />
                    </div>
                    <div className="icon">
                        <img src= "placeholder.png" ></img>
                    </div>
                </div>
                <div>
                        <h2>Add Ingredient Types</h2>
                
                        <div>
                            <input type="text" 
                            id="itype"
                            placeholder="Ingredient Type"
                            value={currentIngTypeName} 
                            onChange={(e)=> setCurrentIngTypeName(e.target.value)} />                         
                            <label htmlFor="reqd">Required?</label> 
                            <input 
                                type="checkbox" 
                                id="reqd" 
                                checked={currentIngTypeRequired} 
                                onChange={(e)=> setCurrentIngTypeRequired(e.target.checked)} 
                            />
                            <label htmlFor="mult">Multiple of This Ingredient Allowed?</label> 
                            <input 
                                type="checkbox" 
                                id="mult" 
                                checked={currentIngTypeMultiple} 
                                onChange={(e)=> setCurrentIngTypeMultiple(e.target.checked)} 
                            />
                            <button onClick={handleIngredientAddition}>Add</button>
                        </div>
                        <LinedPaper
                            section_title="Current Formula"
                            contents={recipeFormulaParts}
                            col_names={[
                                { label: "Ingredient Name", field: "ing_type_name" },
                                { label: "Required?", field: "ing_type_required" },
                                { label: "Multiple of this ingredient allowed?", field: "ing_type_multiple"}
                            ]}
                          
                        />
                    
                </div>
            
                {<button type="submit">Submit Formula!</button>}
            </form>

        </div>
    );
    
}

export default RecipeForm;