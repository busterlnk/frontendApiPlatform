import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {

    // const NotFound = () => (
    //   <h1>Not Found</h1>
    // );

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route render={() => <h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
