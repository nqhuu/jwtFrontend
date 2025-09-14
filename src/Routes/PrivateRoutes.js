import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect, use } from "react";
import { useHistory } from 'react-router-dom'

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
                <Route path={props.path} component={props.component} />
            </Router>,
        </>
    )
}

export default PrivateRoutes;