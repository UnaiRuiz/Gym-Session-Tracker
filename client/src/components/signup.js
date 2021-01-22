import React, { Component } from 'react';
import axios from 'axios';
import MD5 from "crypto-js/md5";
import './components.css';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
        }
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
    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    validateForm() {
        console.log("empieza validación")
        if (this.state.username === '') {
            alert("Choose a username");
            return false
        } else if (this.state.password.length > 20) {
            alert("Wrong Password length.");
            return false
        } else if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords do not match.");
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
            username: this.state.username.toLowerCase(),
            password: this.state.password,
        }
        console.log(user);
        if (this.validateForm()) {
            user.password = MD5(user.password).toString();
            axios.post("http://localhost:5000/user/signup", user)
                .then((res) => {
                    console.log(res.data);
                    if (!res.data.auth) {
                        alert(res.data.message);
                    } else {
                        window.location = '/signin';
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
                        <h3>Sign Up</h3>
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
                                <label>Confirm Password: </label>
                                <input type="password"
                                    className="form-control"
                                    value={this.state.confirmPassword}
                                    onChange={this.onChangeConfirmPassword}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Create account" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}