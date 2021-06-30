import React from 'react'
import './App.css';

import Balance from './components/Balance'
class App extends React.Component {
  render() {
    const appStyles = {
      marginTop: "210px",
      background: 'linear-gradient(to right, #430089, #82ffa1)',
      width: "700px",
      height: "700px",
      position: "fixed",
      marginLeft:"30%",
      borderRadius: "5px"
    }

    return (
        <div style={appStyles} className="App">
          <Balance/>
        </div>
    );
  }
}

export default App;
