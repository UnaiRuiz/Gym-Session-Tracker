import React from "react";
import "./components.css";

function Footer() {
  return (
    <div className="main-footer bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-sm justify-content-center">
            <h4>ABOUT</h4>
            <ul>
              <li>Web Technologies</li>
              <li>Mathematics and Informatics Faculty</li>
              <li>Vilnius University</li>
            </ul>
          </div>
          <div className="col-sm justify-content-center">
            <h4>ASSIGNMENT</h4>
            <ul>
              <li>Final Project</li>
              <li>CRUD Application</li>
              <li>Gym Session tracker App</li>
            </ul>
          </div>
          <div className="col-sm justify-content-center">
            <h4>PLATFORM</h4>
            <ul>
              <li>NodeJS + ExpressJS <i class="fab fa-node-js"></i></li>
              <li>ReactJS <i class="fab fa-react"></i></li>
              <li>MongoDB <i class="fas fa-database"></i></li>
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
  );
}

export default Footer;