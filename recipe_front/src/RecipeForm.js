import React, { Component } from 'react';

class RecipeForm extends Component {

    render() {
        const formStyle = {
            display: 'flex',
            flexDirection: 'column', // Align elements vertically
            //alignItems: 'center', // Center horizontally
            width: '50%',
            margin: '0 auto', // Center the form horizontally
        };

        
        const difficultyStyle = {
            display: 'flex',
            marginLeft: '110px',
            width: '300px', // Adjust the width as needed
            height: '20px', // Adjust the height as needed
            //alignItems: 'center',
            justifyContent: 'space-between', 
       
        }

        const sliderStyle = {
            
            flexDirection:'column',
            alignItems: 'center',
            flexWrap: 'wrap'
            
        }

        const recipeAttributeStyle = {
            display: 'flex',
            flexDirection: 'row'

        }

        const ratingLabels = [1, 2, 3, 4, 5]
        return (
            <div>
            <form style = {formStyle}>
                    <div style={recipeAttributeStyle}>
                    <fieldset>
                    
                        <label htmlFor="rname" style={{display: 'inline-block', float:'left', width: '100px', textAlign: 'left', marginRight: '10px'}}>Recipe Name<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" id="rname" name="recipename" style={{ float:'left',  width: '300px' }} required /><br />
                   
                        <div style={sliderStyle}>
                                <label htmlFor="diff" style={{float: 'left', display: 'inline-block', width: '100px', textAlign: 'right', marginRight: '10px' }}>Difficulty<span style={{ color: 'red' }}>*</span></label>
                                <input type="range" id="diff" name="difficulty" min="1" max="5" step="1" style={difficultyStyle} required />
                          
                    
                                <div style={difficultyStyle}>
                                    {ratingLabels.map((label) => (
                                    <span key={label}>{label}</span>
                                    ))}
                                </div>
                        </div>
                        </fieldset>

                        <fieldset>

                        </fieldset>
                     </div>
                <fieldset>  
                    <div>
                        <h4>Ingredients</h4>
                        <textarea id="ingredients" />
                        <h4>Instructions</h4>
                        <textarea id="instructions" />
                    </div>
                </fieldset>
               

             
                {/* Submit button; submit the recipe to be parsed and possibly saved*/}
                           </form>
            </div>
        );
    }
}

export default RecipeForm;