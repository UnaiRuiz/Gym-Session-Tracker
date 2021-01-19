import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

import Navbar from "./components/navbar"
import GymSessionList from "./components/gymsessionlist";
import EditGymSession from "./components/editgymsession";
import AddGymSession from "./components/addgymsession";
import Footer from "./components/footer";

function App() {

  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={GymSessionList} />
      <Route path="/edit/:id/:date/:duration?/:description?/:sup" component={EditGymSession} /> 
      <Route path="/add" component={AddGymSession} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
