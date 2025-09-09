// import logo from './logo.svg';
import './App.scss';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import Register from './components/Register/Register';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
          <Route path="/registor" exact>
            <Register />
          </Route>
        </Switch>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      // theme="light"
      />
    </Router>
  );
}

export default App;
