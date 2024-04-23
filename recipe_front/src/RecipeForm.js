import axios from 'axios';
import React, { Component } from 'react';
import FileSelector from './FileSelect';
import FolderSelector from './FolderSelect';
class RecipeForm extends Component {
    constructor(props) {
        super(props);

        //form field data is saved as "states" in react
        this.state = {
            recipeName: '',
            recipeDifficulty: 1,
            recipeSeason: 'None',
            recipeCategory: 'None',
            recipeCourse: 'None',
            recipeCuisine: 'None',
            recipeIngredients: '',
            recipeInstructions: '',
            recipeNotes: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // Handle form submission logic, e.g., send data to the server
        console.log('Form submitted with state:', this.state);

        //TODO: find out what this endpoint will be
        axios.post('http://your-django-api-endpoint', this.state)
            .then(response => {
                console.log('Form data sent successfully:', response.data);
                // Handle successful response from the Django backend, if needed
            })
            .catch(error => {
                console.error('Error sending form data:', error);
                // Handle errors, if any
            });

        this.setState({
            recipeName: '',
            recipeDifficulty: 1,
            recipeSeason: 'None',
            recipeCategory: 'None',
            recipeCourse: 'None',
            recipeCuisine: 'None',
            recipeIngredients: '',
            recipeInstructions: '',
            recipeNotes: ''
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
            
            flexDirection:'column',
        }

        const recipeAttributeStyle = {
            display: 'flex',
            flexDirection: 'row'

        }

        const seasons = ['None', 'Spring', 'Summer', 'Fall', 'Winter']
        const ratingLabels = [1, 2, 3, 4, 5]
        const recipeCategories = ['None', 'Appetizers', 'Beverages', 'Salads', 'Soups and Stews', 'Cakes', 'Bars and Cookies', 'Breads', 'Condiments, Seasonings and Sauces', 'Fish and Seafood', 'Desserts',
            'Vegetables', 'Side Dishes', 'Grilling and Barbecue', 'Pizza', 'Sandwiches', 'Beef and Pork', 'Poultry', 'Snacks', 'Main Courses', 'Casseroles'].sort()
        const courses = ['None', 'Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer', 'Beverage'].sort()
        const cuisines = ['None', 'American', 'Asian', 'Chinese', 'Korean', 'Mexican', 'Tex-Mex', 'Indian', 'Japanese', 'French', 'Italian', 'Spanish', 'African', 'Vietnamese',
                         'Thai'].sort()
        return (
            <div>
                <form style={formStyle} onSubmit={this.handleSubmit}>
                    <div style={recipeAttributeStyle}>
                        <fieldset>
                    
                            <label htmlFor="rname" style={{ display: 'inline-block', float: 'left', width: '100px', textAlign: 'left', marginRight: '10px' }}>Recipe Name
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="rname"
                                name="recipeName"
                                style={{ float: 'left', width: '300px' }}
                                value={this.state.recipeName}
                                onChange={this.handleChange}
                                required
                            />
                            <br />
                   
                            <div style={sliderStyle}>
                                <label htmlFor="diff" >Difficulty
                                    <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="range"
                                    id="diff"
                                    name="recipeDifficulty"
                                    min="1"
                                    max="5"
                                    step="1"
                                    style={difficultyStyle}
                                    required
                                    value={this.state.recipeDifficulty}
                                    onChange={this.handleChange}
                                />
                          
                    
                                    <div style={difficultyStyle}>
                                        {ratingLabels.map((label) => (
                                        <span key={label}>{label}</span>
                                        ))}
                                    </div>
                            </div>
                            </fieldset>

                            <fieldset style={{ width: '100%' }}>
                                <div style={dropdownStyle}>
                                <label htmlFor="season">Season</label>
                                <select
                                    name="recipeSeason"
                                    id="season"
                                    value={this.state.recipeSeason}
                                    onChange={this.handleChange }
                                >
                                    {seasons.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="category">Category</label>
                                <select
                                    name="recipeCategory"
                                    id="category"
                                    value={this.state.recipeCategory}
                                    onChange={this.handleChange}
                                >
                                    {recipeCategories.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <br /><br />

                                <label htmlFor="course">Course</label>
                                <select
                                    name="recipeCourse"
                                    id="course"
                                    value={this.state.recipeCourse}
                                    onChange={this.handleChange}
                                >
                                    {courses.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>


                                <label htmlFor="cuisine">Cuisine</label>
                                <select
                                    name="recipeCuisine"
                                    id="cuisine"
                                    value={this.state.recipeCuisine}
                                    onChange={this.handleChange}
                                >
                                    {cuisines.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                </div>
                            </fieldset>
                     </div>
                <fieldset>  
                    <div>
                        <h4>Ingredients<span style={{ color: 'red' }}>*</span></h4>
                            <textarea
                                name="recipeIngredients"
                                id="ingredients"
                                value={this.state.recipeIngredients}
                                onChange={this.handleChange}
                                required
                            />
                        <h4>Instructions<span style={{ color: 'red' }}>*</span></h4>
                            <textarea
                                name="recipeInstructions"
                                id="instructions"
                                value={this.state.recipeInstructions}
                                onChange={this.handleChange}

                                required />
                        <h4>Recipe Notes</h4>
                            <textarea
                                name="recipeNotes"
                                id="notes"
                                value={this.state.recipeNotes}
                                onChange={this.handleChange} />
                    </div>
                    </fieldset>
                    <button type="submit">Submit</button>
               

             
                {/* Submit button; submit the recipe to be parsed and possibly saved*/}
                </form>

            </div>
        );
    }
}

export default RecipeForm;