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
import { Audio } from 'react-loader-spinner';

function App() {

  let { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);

  }, [])

  return (
    <Router>
      <>
        {user && user.Authenticated && user.isLoading ?
          <div className='loading'>
            <Audio
              heigth="100"
              width="100"
              color='grey'
              ariaLabel='loading'
            />
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
