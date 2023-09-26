import './App.css';
import RecipeForm from './RecipeForm'

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
        <h1>Recipe Entry</h1>
          <div style={containerStyle}>
            <h2 style={titleStyle}>Manual Recipe Entry</h2>
              <RecipeForm />
              
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
