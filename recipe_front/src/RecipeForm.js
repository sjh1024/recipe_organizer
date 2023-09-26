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
            float: 'center',
            width: '75%', // Adjust the width as needed
            height: '20px', // Adjust the height as needed
            alignItems: 'center',
            justifyContent: 'space-between', 
     
        }

        const radioStyle = {
           
            float: 'left',
        }

       
        const ratingLabels = [1, 2, 3, 4, 5]
        return (
            <div>
            <form style = {formStyle}>
              
                <label htmlFor="rname" style={{display: 'inline-block', width: '100px', textAlign: 'right', marginRight: '10px'}}>Recipe Name<span style={{ color: 'red' }}>*</span></label>
                <input type="text" id="rname" name="recipename" style={{ width: '300px' }} required/><br/>

                <label htmlFor="diff">Recipe Difficulty<span style={{ color: 'red' }}>*</span></label>
                <input type="range" id="diff" name="difficulty" min="1" max="5" step="1" style={difficultyStyle}required/><br/>
               <div style={difficultyStyle}>
                {ratingLabels.map((label) => (
               <span key={label}>{label}</span>
               ))}
               </div>

               <br/>

               <fieldset>
               <div style={radioStyle}>
                  <h4>Recipe Season</h4>
                <input type="radio" id="noseason" name="season" value="None" checked/>
                <label for="noseason">None</label><br/>

                <input type="radio" id="springseason" name="season" value="Spring"/>
                <label for="springseason">Spring</label><br/>

                <input type="radio" id="summerseason" name="season" value="Summer"/>
                <label for="summerseason">Summer</label><br/>

                <input type="radio" id="fallseason" name="season" value="Fall"/>
                <label for="fallseason">Fall</label><br/>

                <input type="radio" id="winterseason" name="season" value="Winter"/>
                <label for="winterseason">Winter</label><br/><br/>
               {/*token input for flavors*/}
               {/*token input for holidays*/}
                </div>
                </fieldset>
                <div>
                <h4>Ingredients</h4>
                <textarea id="ingredients"/>
                <h4>Instructions</h4>
                <textarea id="instructions"/>
                </div>

                {/* Submit button; submit the recipe to be parsed and possibly saved*/}
                           </form>
            </div>
        );
    }
}

export default RecipeForm;