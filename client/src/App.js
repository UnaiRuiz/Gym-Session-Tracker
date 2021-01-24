import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import Navbar from "./components/navbar"
import GymSessionList from "./components/gymsessionlist";
import EditGymSession from "./components/editgymsession";
import AddGymSession from "./components/addgymsession";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Footer from "./components/footer";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLogged() {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoggedIn(false);
        return;
      }
      axios.get("http://localhost:5000/user/isAuth", {
        headers: {
          "auth": localStorage.getItem("token"),
        }
      })
        .then(response => {
          console.log("logged: " + response.data.auth);
          setLoggedIn(true);
          return;
        })
        .catch((error) => {
          console.log(error);
        })
    }
    checkLogged();
  }, [loggedIn])

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Router>
          <Navbar logged={loggedIn} />
          <br />
          <Route path="/" exact component={GymSessionList} />
          <Route path="/edit/:id/:date/:duration?/:description?/:sup" component={EditGymSession} />
          <Route path="/add" component={AddGymSession} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
