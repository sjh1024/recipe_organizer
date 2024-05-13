import './App.css';
//import Modal from "./components/Modal"
import RecipeForm from './RecipeForm.js';
import axios from 'axios'


function App() {




  return (
    <div className="App">
      <h1>New Recipe Template</h1>
      <div>
      <RecipeForm/>

      </div>


      <div className="file_help">

      </div>
    </div>
  );
}

export default App;
