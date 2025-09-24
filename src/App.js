// import logo from './logo.svg';
import './App.scss';
import Nav from './components/Navigation/Nav';
import { useState, useEffect, useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Routes/AppRoutes';
import { UserContext } from "./context/UserContext";
import _ from "lodash"
import { BrowserRouter as Router } from "react-router-dom";
import { Rings } from 'react-loader-spinner';

function App() {

  let { user } = useContext(UserContext);

  useEffect(() => {

  }, [])

  return (
    <Router>
      <>
        {user && user.isLoading ?
          <div className="loading-container">
            <Rings
              heigth="100"
              width="100"
              color='blue'
              ariaLabel='loading'
            />
            <div>Loading...</div>
          </div>
          :
          <>
            <div className="app-container">
              <Nav />
              <AppRoutes />
            </div>
            <ToastContainer
              position="top-right"
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
          </>
        }
      </>
    </Router>
  );
}

export default App;
