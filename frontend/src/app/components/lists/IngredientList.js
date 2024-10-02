"use client"
import React, {useState} from 'react';
import axios from 'axios';

const IngredientList = ({ingredient_type_id, ingredient_type_name, ingredient_name_list}) => {
    const listId = ingredient_type_id;
    return (
        <div>
            <h2>{ingredient_type_name}</h2>
            {ingredient_name_list.map((ingredient, index) => (
                
             <div key={index}>
             <h2>{ingredient}</h2>
             <ul>
                       {itemsByIngredient[ingredient].map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li> // List each item under its respective heading
                    ))}
             </ul>
             </div>
            ))}
        </div>
    );
    
}

export default IngredientList;