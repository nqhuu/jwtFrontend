// import logo from './logo.svg';
import './App.scss';
import Login from './components/Login/Login';
import Nav from './components/Navigation/Nav';
import Register from './components/Register/Register';
import Users from './components/ManageUsers/Users';
import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from "lodash"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  let [account, setAccount] = useState("");

  useEffect(() => {
    let session = JSON.parse(sessionStorage.getItem("account"));
    if (session) {
      setAccount({
        ...session
      })
    }
  }, [])

  return (
    <Router>
      <div className="app-container">
        {/* Sư dụng hàm  isEmpty của thư viện lodash để check rỗng, rỗng trả về true*/}
        {account && !_.isEmpty(account) && account.Authenticated &&
          <Nav />
        }
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
          <Route path="/users" exact>
            <Users />
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
