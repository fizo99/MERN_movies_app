import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';  
import Nav from '../components/Nav'

const SIGNUP_URL = 'http://localhost:5000/auth/signup';
const LOGIN_URL = 'http://localhost:5000/auth/login';

class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    errors: [],
    registered: false,
    usernameTaken: false,
    redirect: false,
    communicate: ""
  }

  signup = async (e) => {
    e.preventDefault();

    await this.setState({
      username: e.target[0].value,
      password: e.target[1].value,
      confirmPassword: e.target[2].value,
      registered: false
    })

    if(await this.validate()){
      // input data is valid
      // send data to server
      const body = {
        username: this.state.username,
        password: this.state.password,
      }

      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      if(response.ok){
        //success -> 
        
        this.setState({
          usernameTaken: false,
          registered: true,

          communicate: "Success"
        })
        // setTimeout(() => {
        //   this.setState({
        //     redirect: true,
        //   })
        // },1000)
        
        const login = await fetch(LOGIN_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const result = await(login.json())

        if(login.ok){
          //success -> 
          localStorage.token = result.token
          this.setState({
            error: "",
            logged: true,
          })
          setTimeout(() => {
            this.setState({
              redirect: true,
            })
          },1000)
        }else{
          const errorMessage = result.message;
          this.setState({
            error: errorMessage
          })
        }
      }else{
        const err = await response.json();
        const errorMessage = err.message;
        this.setState({
          usernameTaken: true,
          communicate: errorMessage
        })
      }

      // fetch(SIGNUP_URL, {
      //   method: 'POST',
      //   body: JSON.stringify(body),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then((response) => {
      //   if(response.ok) {
      //     return response.json()
      //   }else{
      //     throw(response)
      //   }
      // }).then((newUser) => {
        
      // }).catch((err) => {
      //   console.log(err)
      // })
   }
  }


  validate = async () => {
    const errors = [];

    if (this.state.username.length < 3) 
      errors.push("Username too short");

    if (this.state.username.length > 30) 
      errors.push("Username too long");

    if (!this.state.username.match(/^[0-9a-zA-Z_]+$/))
      errors.push("Username contains not valid characters")

    if (this.state.password !== this.state.confirmPassword) 
      errors.push("Passwords are not equal");

    if (this.state.password.length < 6) 
      errors.push("Password too short");
      
    await this.setState({
      errors: errors
    })
    if (errors.length > 0)
      return false
    else
      return true
  }



  render() {
    const { errors } = this.state;
    const { communicate } = this.state;

    if(this.state.redirect)
      return <Redirect to='/dashboard'/>
      
    return (
      <div>
        <Nav/>
        <div className = "jumbotron"> 
          <form onSubmit={this.signup}>
            {
              errors.length
              ? <div className="alert alert-danger" role="alert">
                  {
                  errors.map(error => (
                    <p key={error}>{error}</p>
                  ))
                  }
                </div>
              : ""
            }
            {
              this.state.usernameTaken
              ? <div className="alert alert-danger" role="alert">
                  { communicate }
                </div>
              : ""
            }
            {
              this.state.registered
              ? <div className="alert alert-success" role="alert">
                  Success
                </div>
              : ""
            }
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                required
                type="text" 
                className="form-control" 
                id="username" 
                placeholder="Enter username"
                aria-describedby="usernameHelp"/>
              <small id ="usernameHelp" className="form-text text-muted">
                Username must be longer than 2 characters and shorter than 30.
                Username can contain only alphanumeric characters and under_scores.
              </small>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="password">Password</label>
                <input 
                  required
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Password"
                  aria-describedby="passwordHelp"/>
                <small id ="passwordHelp" className="form-text text-muted">
                  Password must be 6 or more characters long.
                </small>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  required
                  type="password" 
                  className="form-control" 
                  id="confirmPassword" 
                  placeholder="Password"
                  aria-describedby="confirmPasswordHelp"/>
                <small id ="confirmPasswordHelp" className="form-text text-muted">
                  Please confirm your password.
                </small>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div> 
      </div>
    );
  }
}

export default Signup;