import './App.css';
//import Modal from "./components/Modal"
import RecipeForm from './RecipeForm.js';
import axios from 'axios'


function App() {

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',

    textAlign: 'left', // Align text left within the container
    //margin: '0 20px', // Add margin to align with fieldset
  };
  const titleStyle = {
    display: 'flex',
    textAlign: 'left',
    margin: '0 25% auto', // Reset margin to avoid extra spacing
  };


  return (
    <div className="App">
      <h1>New Recipe Template</h1>
      <div style={containerStyle}>
      <RecipeForm/>

      </div>


      <div className="file_help">
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
