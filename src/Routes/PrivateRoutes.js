import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect, use } from "react";
import { useHistory } from 'react-router-dom'
import Login from "../components/Login/Login";

const PrivateRoutes = (props) => {
    let history = useHistory();
    useEffect(() => {
        let session = JSON.parse(sessionStorage.getItem("account"));
        if (!session || session && session.Authenticated == false) {
            history.push("/login")
        }
    }, []);
    return (
        <>
            <Router>
                <Route path={props.path} component={props && props.component ? props.component : Login} />
            </Router>,
        </>
    )
}

export default PrivateRoutes;