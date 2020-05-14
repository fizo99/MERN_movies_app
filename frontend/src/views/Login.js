import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';  
import Nav from '../components/Nav'

const LOGIN_URL = 'http://localhost:5000/auth/login';

class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: "",
    logged: false,
    redirect: false,
  }

  login = async (e) => {
    e.preventDefault();

    await this.setState({
      username: e.target[0].value,
      password: e.target[1].value,
    })

    const body = {
      username: this.state.username,
      password: this.state.password,
    }

    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(response.ok){
      //success -> 
      const result = await(response.json())
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
      const result = await(response.json())
      const errorMessage = result.message;
      this.setState({
        error: errorMessage
      })
    }
   }
  


  render() {

    if(this.state.redirect)
      return <Redirect to='/dashboard'/>

      
    return (
      <div>
        <Nav/>
        <div className = "jumbotron"> 
            {
              this.state.error
              ? <div className="alert alert-danger" role="alert">
                  {this.state.error}
                </div>
              : ""
            }
            {
              this.state.logged
              ? <div className="alert alert-success" role="alert">
                  Success
                </div>
              : ""
            }
           <form onSubmit = {this.login}> 
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
                Enter your username
              </small>
            </div>
              <div>
                <label htmlFor="password">Password</label>
                <input 
                  required
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Password"
                  aria-describedby="passwordHelp"/>
                <small id ="passwordHelp" className="form-text text-muted">
                  Enter password
                </small>
              </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div> 
    </div>
    );
  }
}

export default Signup;