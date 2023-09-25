import logo from './logo.svg';
import './App.css';
import FileSelector from './FileSelect';
import FolderSelector from './FolderSelect';

function App() {
  return (
        <div className="App">
        <h1>Recipe Entry</h1>
          <h2>Manual Recipe Entry</h2>
             <RecipeForm/>
          <h2>Recipe from File(s)</h2>
          <div>
              <FileSelector/>
              <FolderSelector/>
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
