import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './components.css';


export default class GymSessionList extends Component {
  constructor(props) {
    super(props);

    this.deleteGymSession = this.deleteGymSession.bind(this);

    this.state = { gymsessions: [] };
  }

  componentDidMount() {
    //Check if logged
    axios.get("http://localhost:5000/user/isAuth", {
      headers: {
        "auth": localStorage.getItem("token"),
      }
    })
      .then(response => {
        console.log("logged: " + response.data.auth);
        if (!response.data.auth) {
          window.location = '/signin'
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      })

    //Ask for gym sessions
    axios.get("http://localhost:5000/gymsession", {
      headers: {
        "auth": localStorage.getItem("token"),
      }
    })
      .then(response => {
        this.setState({ gymsessions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteGymSession(_id) {
    axios.delete(`http://localhost:5000/gymsession/delete/${_id}`, {
      data: {
        "auth": localStorage.getItem("token"),
      }
    })
      .then(response => { console.log(response.data) });

    this.setState({
      gymsessions: this.state.gymsessions.filter(el => el._id !== _id)
    })
  }

  render() {
    return (
      <div>
        {this.state.gymsessions.length > 0 ?
          <div class="container table-responsive">
            <h3>Gym Sessions: {this.state.gymsessions.length}</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Duration (mins)</th>
                  <th>Description</th>
                  <th>Supplements?</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.gymsessions.map((val) => {
                  return (
                    <tr key={val._id}>
                      <td>
                        {val.Date.substring(0, 10)}
                      </td>
                      <td>
                        {val.Duration}
                      </td>
                      <td>
                        {val.Description}
                      </td>
                      <td>
                        {val.Sup ? ("yes") : ("no")}
                      </td>
                      <td>
                        <Link id="nolink" to={"/edit/" + val._id + "/" + val.Date + "/" + val.Duration + "/" + val.Description + "/" + val.Sup}>Edit</Link>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this session?')) this.deleteGymSession(val._id) }}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> :
          <div class="container">
            <div class="row justify-content-center">
              <div id="img-overlay" class="col-lg-10">
                <img class="img-fluid " id="start-gym" src="/in-gym.jpg" alt="gym session tracker logo"></img>
                <div class="container" id="overlay">
                  <div id="text">Add your first gym session!</div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}