"use client"
import React, {useState} from 'react';
import axios from 'axios';
import LinedPaper from '../components/linedPaper/LinedPaper.js';

/*
this.state 
    recipeName: '',
    recipeDifficulty: 1,
    recipeSeason: 'None',
    recipeCategory: 'None',
    recipeCourse: 'None',
    recipeCuisine: 'None',
    recipeIngredients: '',
    recipeInstructions: '',
    recipeNotes: ''
};*/

const FormulaForm = () => {

    const [FormulaName, setFormulaName] = useState("");
    const [currentIngTypeName, setCurrentIngTypeName] = useState("");
    const [currentIngTypeRequired, setCurrentIngTypeRequired] = useState(false);
    const [currentIngTypeMultiple, setCurrentIngTypeMultiple] = useState(true);
    const [recipeFormulaParts, setrecipeFormulaParts] = useState([]);
    

    const handleIngredientAddition = (event) => {
        event.preventDefault();
        const trimmedIngTypeName = currentIngTypeName.trim();
        if(trimmedIngTypeName.length === 0){
            window.alert("Please enter an ingredient type name.")
        }
        else{
            const newIngredientType = {
                ing_type_name: trimmedIngTypeName,
                ing_type_required: currentIngTypeRequired.toString(),
                ing_type_multiple: currentIngTypeMultiple.toString(),
            }
            setrecipeFormulaParts([...recipeFormulaParts, newIngredientType]);
            setCurrentIngTypeName(""),
            setCurrentIngTypeRequired(false);
            setCurrentIngTypeMultiple(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: actually get this hosted somewhere
        const url = 'http://localhost:8000/api/submit_formula'

        const formData = {
            formula_name: FormulaName,
            recipeFormulaParts: recipeFormulaParts,
        };


        // Handle form submission logic, e.g., send data to the server
        console.log('Submitting the recipe formula', recipeFormulaParts);
        console.log('The recipe formula you submitted is named: ', FormulaName);
        
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

export default FormulaForm;