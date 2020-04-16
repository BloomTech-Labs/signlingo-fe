import React from "react";
import "./App.scss";
import Dashboard from './components/Dashboard';
import Signup from  './components/Signup';
import Login from "./components/Login";


function App() {
  return (
    <div className="App">
      
      <Signup />
      <Login />
      <Dashboard />

    </div>
  );
}

export default App;


