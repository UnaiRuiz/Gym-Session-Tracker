import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './components.css';

export default class AddGymSession extends Component {
  constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSup = this.onChangeSup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      date: new Date(),
      duration: 60,
      description: '',
      sup: false,
    }
  }

  componentDidMount() {
    //Check if logged
    axios.get("http://localhost:5000/user/isAuth", {
      headers: {
        "auth": localStorage.getItem("token"),
      }
    })
      .then(response => {
        if (!response.data.auth) {
          window.location = '/signin'
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeSup(e) {
    this.setState({
      sup: e.target.value
    })
  }

  validateForm() {
    if (this.state.date == null) {
      alert("Select the date");
      return false
    } else if (isNaN(this.state.duration)) {
      alert("Enter the duration in minutes.");
      return false
    } else if (this.state.description.length > 50) {
      alert("Description is too long.");
      return false
    } else if(this.state.description.length === 0) {
      alert("Insert a description.");
      return false
    } else {
      return true
    }
  }

  goBack(){
    window.location = '/';
  }

  onSubmit(e) {
    e.preventDefault();

    const gymsession = {
      date: this.state.date,
      duration: this.state.duration,
      description: this.state.description,
      sup: this.state.sup
    }
    if (this.validateForm()) {
        axios.post("http://localhost:5000/gymsession/add", 
        {
          "auth": localStorage.getItem("token"),
          gymsession
        })
            .then(res => console.log(res.data));
        window.location = '/';
    }else{
        console.log("not sent")
    }
  }

  render() {
    return (
    <div>
      <h3>Add a new Gym Session</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker 
                selected={this.state.date}
                onChange={this.onChangeDate} dateFormat='yyyy-MM-dd' maxDate={new Date()}
                isClearable showYearDropdown scrollableMonthYearDropdown closeOnScroll={true}
                strictParsing todayButton="Select Today" />
          </div>
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group"> 
          <label>Did you take any supplements?: </label>
          <input className="radioInput" type="radio" checked="checked" id="no" name="supplements" value="false" onChange={this.onChangeSup} />
          <label>no</label>
          <input className="radioInput" type="radio" id="yes" name="supplements" value="true" onChange={this.onChangeSup} />
          <label>yes</label>
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <input id="secondbutton" type="button" value="Cancel" onClick={() => { this.goBack() }} className="btn btn-danger" />
        </div>
      </form>
    </div>
    )
  }
}