import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';

import Header from "./components/layout/Header/Header";
import Main from "./components/layout/Main/Main";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Main />
      </Router>
    </div>
  );
}

export default App;
