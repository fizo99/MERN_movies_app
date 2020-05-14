import React, { Component } from 'react';
import {
  Link,
} from "react-router-dom";
import Nav from '../components/Nav'

class Home extends Component {
  render() {
    return (
        <div className="text-center">
          <Nav/>
            <div className="jumbotron">
            <h1 className="display-3">Auth component</h1>
            <p className="lead"></p>
            <hr className="my-4"/>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" role="button">
                  <Link 
                    style={{color: 'white'}}
                    to="/signup">Sign up</Link>
                </a>
                <a className="btn btn-primary btn-lg ml-2" role="button">
                  <Link 
                    style={{color: 'white'}}
                    to="/login">Log in</Link>
                </a>
            </p>
            </div>
        </div>
    );
  }
}

export default Home;