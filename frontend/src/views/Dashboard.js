import React, { Component } from 'react';
import {
  Link, Redirect,
} from "react-router-dom";
import Nav from '../components/Nav'

const API_URL ='http://localhost:5000/';

class Dashboard extends Component {
  state = {
    user: "",
    loggedOut: false,
  }
  componentDidMount(){

    fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.token}`
      }
    }).then(res => res.json())
      .then(newres => {
        this.setState({
          user: newres.user.username
        })
      })
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      loggedOut: true
    })
  }

  render() {
    if(this.state.loggedOut)
      return <Redirect to="/"></Redirect>

    return (
        <div className="text-center">
          <Nav/>
            <div className="jumbotron">
            {
              this.state.user
                ? <h1 className="display-3">Hello {this.state.user}</h1>
                : ""
            }
            <button onClick={this.logout} type="submit" className="btn btn-primary mt-2">Logout</button>
            </div>
        </div>
    );
  }
}

export default Dashboard;