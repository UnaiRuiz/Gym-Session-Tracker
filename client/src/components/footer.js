import React from "react";
import "./components.css";

function Footer() {
  return (
    <div className="container">
      <div className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>ABOUT</h4>
              <ul>
                <li>Web Technologies</li>
                <li>Mathematics and Informatics Faculty</li>
                <li>Vilnius University</li>
              </ul>
            </div>
            <div className="col">
              <h4>ASSIGNMENT</h4>
              <ul>
                <li>Final Project</li>
                <li>CRUD Application</li>
                <li>Gym Session tracker App</li>
              </ul>
            </div>
            <div className="col">
              <h4>PLATFORM</h4>
              <ul>
                <li>Heroku</li>
                <li>Mongo Atlas</li>
                <li>MERN</li>
              </ul>
            </div>
          </div>
          <hr />
          <div id='bottom-footer' >
            <p id='bottom-footer-text'>
              &copy;{new Date().getFullYear()} | Created by Unai Ruiz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;