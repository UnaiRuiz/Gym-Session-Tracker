import React, { Component } from 'react';
import axios from 'axios';
import MD5 from "crypto-js/md5";
import './components.css';

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
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
                console.log("logged: " + response.data.auth);
                if (response.data.auth) {
                    window.location = '/'
                }
                return;
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    validateForm() {
        console.log("empieza validación")
        if (this.state.username === '') {
            console.log("Username empty")
            alert("Choose a username");
            return false
        } else if (this.state.password.length > 20) {
            console.log("wrong password lenght")
            alert("Wrong Password length.");
            return false
        } else {
            console.log("good")
            return true
        }
    }

    goBack() {
        window.location = '/';
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username.toLocaleLowerCase(),
            password: this.state.password,
        }
        console.log(user);
        if (this.validateForm()) {
            user.password = MD5(user.password).toString();
            axios.post("http://localhost:5000/user/signin", user)
                .then((res) => {
                    console.log(res.data);
                    if (!res.data.auth) {
                        alert(res.data.message);
                    } else {
                        localStorage.setItem("token", res.data.token)
                        window.location = '/';
                    }
                })
        } else {
            console.log("not sent")
        }
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row justify-content-center align-self-center">
                    <div class="col-md-6 col-xl-4">
                        <h3>Sign In</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Username: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label>Password: </label>
                                <input type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                />
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Submit" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}