import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { 
      GuardProvider, 
      GuardedRoute 
} from 'react-router-guards';
  
import 'bootswatch/dist/superhero/bootstrap.css';

import Home from './views/Home'
import Signup from './views/Signup'
import Login from './views/Login'
import Dashboard from './views/Dashboard'

const isLoggedIn = (to, from, next) => {

    if(to.match.path === "/dashboard"){
        if(localStorage.token){
            next()
        }else{
            next.redirect('/login')
        }
    }
    if(to.match.path === "/login"){
        if(localStorage.token){
            next.redirect('/dashboard')
        }else{
            next()
        }
    }
    if(to.match.path === "/signup"){
        if(localStorage.token){
            next.redirect('/dashboard')
        }else{
            next()
        }
    }
};


class App extends React.Component {

  render() {
      return (
          <div className="App">
              <Router>
                <GuardProvider guards={[isLoggedIn]}>
                    <Switch>
                        <GuardedRoute path="/signup">
                            <Signup />
                        </GuardedRoute>
                        <GuardedRoute path="/login">
                            <Login />
                        </GuardedRoute>
                        <GuardedRoute path="/dashboard">
                            <Dashboard/>
                        </GuardedRoute>

                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </GuardProvider>
              </Router>
          </div>
      );
  }
}

export default App;