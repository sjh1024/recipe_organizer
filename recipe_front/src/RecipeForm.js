import React, { Component } from 'react';
import FileSelector from './FileSelect';
import FolderSelector from './FolderSelect';
class RecipeForm extends Component {

    render() {
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
        const courses = ['None', 'Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Brunch', 'Appetizer', 'Beverage'].sort()
        const cuisines = ['None', 'American', 'Asian', 'Chinese', 'Korean', 'Mexican', 'Tex-Mex', 'Indian', 'Japanese', 'French', 'Italian', 'Spanish', 'African', 'Vietnamese',
                         'Thai'].sort()
        return (
            <div>
            <form style = {formStyle}>
                    <div style={recipeAttributeStyle}>
                        <fieldset>
                    
                            <label htmlFor="rname" style={{display: 'inline-block', float:'left', width: '100px', textAlign: 'left', marginRight: '10px'}}>Recipe Name<span style={{ color: 'red' }}>*</span></label>
                                <input type="text" id="rname" name="recipename" style={{ float:'left',  width: '300px' }} required /><br />
                   
                            <div style={sliderStyle}>
                                    <label htmlFor="diff" >Difficulty<span style={{ color: 'red' }}>*</span></label>
                                    <input type="range" id="diff" name="difficulty" min="1" max="5" step="1" style={difficultyStyle} required />
                          
                    
                                    <div style={difficultyStyle}>
                                        {ratingLabels.map((label) => (
                                        <span key={label}>{label}</span>
                                        ))}
                                    </div>
                            </div>
                            </fieldset>

                            <fieldset style={{ width: '100%' }}>
                                <div style={dropdownStyle}>
                                <label for="season">Season</label>
                                <select name="season" id="season">
                                    {seasons.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <label for="category">Category</label>
                                <select name="category" id="category" defaultValue="None">
                                    {recipeCategories.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <br /><br />

                                <label for="course">Course</label>
                                <select name="course" id="course" defaultValue="None">
                                    {courses.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>


                                <label for="cuisine">Cuisine</label>
                                <select name="cuisine" id="cuisine" defaultValue="None">
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
                        <textarea id="ingredients" required/>
                        <h4>Instructions<span style={{ color: 'red' }}>*</span></h4>
                        <textarea id="instructions" required/>
                        <h4>Recipe Notes</h4>
                        <textarea id="recipenotes" />
                    </div>
                    </fieldset>
                    
               

             
                {/* Submit button; submit the recipe to be parsed and possibly saved*/}
                </form>
                <form style={formStyle}>
                    <h2>Recipe from File(s)</h2>
                    <fieldset >

                        <div>
                            <FileSelector />
                            <FolderSelector />
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default RecipeForm;