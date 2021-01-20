import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  logout() {
    localStorage.removeItem("token");
    window.location = '/signin'
  }

  componentDidMount() {
    //Check if logged
    axios.get("http://localhost:5000/user/isAuth", {
      headers: {
        "auth": localStorage.getItem("token"),
      }
    })
      .then(response => {
        console.log("logged from navbar: " + response.data.auth);
        console.log("logged variable from navbar: " + this.props.logged);
        if (response.data.auth) {
          this.loggedIn = true
        } else {
          this.loggedIn = false
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Gym Session Tracker</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Gym Sessions</Link>
            </li>
            <li className="navbar-item">
              <Link to="/add" className="nav-link">Add Gym Session</Link>
            </li>
          </ul>
          {
            this.props.logged ?
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link className="nav-link"><span onClick={this.logout}>Log out</span></Link>
                </li>
              </ul> :
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/signin" className="nav-link">Sing in</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/signup" className="nav-link">Sing Up</Link>
                </li>
              </ul>
          }
        </div>
      </nav>
    );
  }
}

