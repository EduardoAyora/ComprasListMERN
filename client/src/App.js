import React from 'react';
import './App.css';
import ControllableTableComponent from './components/ControllableTableComponent';
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ControllableTableComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
