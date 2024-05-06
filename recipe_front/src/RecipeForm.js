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
            current_ing_name: "",
            current_ing_required: "False",

            //this state is stored locally,
            //all objects will be submitted at once to the db in several steps
            recipe_ingredients: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
            })
            .catch(error => {
                console.error('Error sending form data:', error);
                // Handle errors, if any
            });

        this.setState({
            recipe_type_name: "",
            current_ing_name: "",
            current_ing_required: "False",

            //this state is stored locally,
            //all objects will be submitted at once to the db in several steps
            recipe_ingredients: []
        });
    }


    render() {
        // TODO: Move all this styling to App.css
        const formStyle = {
            display: 'flex',
            flexDirection: 'column', // Align elements vertically
            //alignItems: 'center', // Center horizontally
            width: '50%',
            margin: '0 auto', // Center the form horizontally
        };

        const dropdownStyle = {
            display: 'flex',
            flexDirection: 'column', // Align elements vertically
            //alignItems: 'center', // Center horizontally
            width: '75%',
            margin: '0 auto', // Center the form horizontally
        };



        const difficultyStyle = {
            display: 'flex',
            width: '50%', // Adjust the width as needed
            height: '20%', // Adjust the height as needed
            //alignItems: 'center',
            justifyContent: 'space-between',

        }

        const sliderStyle = {

            flexDirection: 'column',
        }

        const recipeAttributeStyle = {
            display: 'flex',
            flexDirection: 'row'

        }

        /*const seasons = ['None', 'Spring', 'Summer', 'Fall', 'Winter']
        const ratingLabels = [1, 2, 3, 4, 5]
        const recipeCategories = ['None', 'Appetizers', 'Beverages', 'Salads', 'Soups and Stews', 'Cakes', 'Bars and Cookies', 'Breads', 'Condiments, Seasonings and Sauces', 'Fish and Seafood', 'Desserts',
            'Vegetables', 'Side Dishes', 'Grilling and Barbecue', 'Pizza', 'Sandwiches', 'Beef and Pork', 'Poultry', 'Snacks', 'Main Courses', 'Casseroles'].sort()
        const courses = ['None', 'Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer', 'Beverage'].sort()
        const cuisines = ['None', 'American', 'Asian', 'Chinese', 'Korean', 'Mexican', 'Tex-Mex', 'Indian', 'Japanese', 'French', 'Italian', 'Spanish', 'African', 'Vietnamese',
            'Thai'].sort()*/

        return (
            <div>
                <form onSubmit={this.handleSubmit}>



                    <button type="submit">Submit</button>
                    {/* Submit button; submit the recipe to be parsed and possibly saved*/}
                </form>

            </div>
        );
    }
}

export default RecipeForm;