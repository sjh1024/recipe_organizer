"use client"
import './globals.css';
//import Modal from "./components/Modal"
import RecipeForm from './RecipeForm.js';
import axios from 'axios'


function App() {


  return (
    <div className="App">
      <h1>New Recipe Template</h1>
      <RecipeForm/>
    </div>
  );
}

export default App;
