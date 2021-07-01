import React from 'react'
import './App.css';

import Balance from './components/Balance'
class App extends React.Component {
  render() {
    return (
        <div className="App">
          <div className="container">
            <Balance/>
          </div>
        </div>
    );
  }
}

export default App;
