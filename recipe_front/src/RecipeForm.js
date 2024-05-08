import axios from 'axios';
import React, { Component } from 'react';
import FileSelector from './FileSelect';
import FolderSelector from './FolderSelect';

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

class RecipeForm extends Component {
    constructor(props) {
        super(props);

        //form field data is saved as "states" in react
        this.state = {
            recipe_type_name: "",
            current_ing_type_name: "",
            current_ing_type_required: "False",
            

            //this state is stored locally,
            //all objects will be submitted at once to the db in several steps
            //state is a list of 2-tuples, containing the following info:
            //ingredient_type_name(str), required(bool)
            recipe_ing_types: []
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIngredientAddition = this.handleIngredientAddition.bind(this);

    }
    handleIngredientAddition(event){
        event.preventDefault();
        const trimmed_ing_type_name = this.state.current_ing_type_name.trim();
        if(trimmed_ing_type_name.length === 0){
            window.alert("Please enter an ingredient type name.")
        }
        else{
            const newIngredientType = [trimmed_ing_type_name, this.state.current_ing_type_name];
            this.setState(prevState => ({
                recipe_ing_types: [...prevState.recipe_ing_types, newIngredientType],
                current_ing_type_name: "",
                current_ing_type_required: "False"
            }))
        }
    
    }
    componentDidMount() {

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
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
    


    render() {
        // TODO: Move all this styling to App.css

        return (
            <div>
                <form>


                    Recipe Type Name: <input type="text" value={this.state.recipe_type_name} onChange={(e)=> this.setState({recipe_type_name: e.target.value})} />
                    <br/>
                    Ingredient Type Name: <input type="text" value={this.state.current_ing_type_name} onChange={(e)=> this.setState({current_ing_type_name: e.target.value})} />
                    <button onClick={this.handleIngredientAddition}>Add</button>
                    {/* Submit button; submit the recipe to be parsed and possibly saved*/}

                    <div>
                    <h2>Ingredient Types</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Ingredient Type Name</th>
                                <th>Required</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.recipe_ing_types.map((ingredient, index) => (
                                <tr key={index}>
                                    <td>{ingredient[0]}</td>
                                    <td>{ingredient[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </form>

            </div>
        );
    }
}

export default RecipeForm;