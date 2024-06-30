"use client"
import React, {useState} from 'react';
import axios from 'axios';
import LinedPaper from './LinedPaper.js';

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

const RecipeForm = () => {

    const [recipeTypeName, setRecipeTypeName] = useState("");
    const [currentIngTypeName, setCurrentIngTypeName] = useState("");
    const [currentIngTypeRequired, setCurrentIngTypeRequired] = useState(false);
    const [recipeIngTypes, setRecipeIngTypes] = useState([]);
    

    const handleIngredientAddition = (event) => {
        event.preventDefault();
        const trimmedIngTypeName = currentIngTypeName.trim();
        if(trimmedIngTypeName.length === 0){
            window.alert("Please enter an ingredient type name.")
        }
        else{
            const newIngredientType = {
                name: trimmedIngTypeName,
                required: currentIngTypeRequired.toString(),
                thirdone: 'TBD'
            }
            setRecipeIngTypes([...recipeIngTypes, newIngredientType]);
            setCurrentIngTypeName(""),
            setCurrentIngTypeRequired(false);
        }
    };

    const handleSubmit = (event) => {
        //event.preventDefault();
        // Handle form submission logic, e.g., send data to the server
        console.log('Submitting the recipe template', this.state);

        //TODO: find out what this endpoint will be
        //it's going to be whatever will be used to submit all queries at once
        //as a transaction
        axios.post('http://localhost:8000/', this.state)
            //this needs to change to some sort of success/failure screen,
            //or empty screen
            .get("http://localhost:8000/api/recipe_type_name")
            .then(response => {
                console.log('Form data sent successfully:', response.data);
                // Handle successful response from the Django backend, if needed
                /*
                    Need to send the following to Django:
                */
            })
            .catch(error => {
                console.error('Error sending form data:', error);
                // Handle errors, if any
            });

        this.setState({
            recipe_type_name: "",
            current_ing_type_name: "",
            current_ing_type_required: "False",

            //this state is stored locally,
            //all objects will be submitted at once to the db in several steps
            recipe_ing_types: []
        });
    }

    return (
        <div>
            <form className="form-container">
                <div className="top-panel">
                    
                    <div className= "text-box">
                        <h2>Recipe Formula Name</h2> 
                        <input 
                            type="text" 
                            id="rtype" 
                            className="text-box"
                            value={recipeTypeName} 
                            onChange={(e)=> setRecipeTypeName(e.target.value)} />
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
                            <button onClick={handleIngredientAddition}>Add</button>
                        </div>
                        <LinedPaper
                            section_title="Current Formula"
                            contents={recipeIngTypes}
                            col_names={[
                                { label: "Ingredient Name", field: "name" },
                                { label: "Required?", field: "required" },
                                { label: "Third One", field: "thirdone" }
                            ]}
                          
                        />
                    
                </div>
            
                {/*<button onClick="submit">Submit</button>*/}
            </form>

        </div>
    );
    
}

export default RecipeForm;