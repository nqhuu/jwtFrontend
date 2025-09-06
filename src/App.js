// import logo from './logo.svg';
import './App.scss';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <Switch>
          <Route path="/news">
            {/* <About /> */}
            news
          </Route>
          <Route path="/about">
            {/* <Users /> */}
            about
          </Route>
          <Route path="/contact">
            {/* <Users /> */}
            contact
          </Route>
          <Route path="/" exact>
            {/* <Home /> */}
            Home
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
