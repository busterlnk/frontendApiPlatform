import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Edit from './Pages/Edit';
import Logout from './Pages/Logout';
import axios from 'axios';

function App() {

    // const NotFound = () => (
    //   <h1>Not Found</h1>
    // );

    // axios.defaults.withCredentials = true;
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/edit/:id" element={<Edit />}/>
        <Route path="/Logout" element={<Logout />}/>
        <Route render={() => <h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
