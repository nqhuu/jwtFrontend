// import logo from './logo.svg';
import './App.scss';
import Nav from './components/Navigation/Nav';
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Routes/AppRoutes';

import _ from "lodash"
import { BrowserRouter as Router, } from "react-router-dom";

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
        <AppRoutes />
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
