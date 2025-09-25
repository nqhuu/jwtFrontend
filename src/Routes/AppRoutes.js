import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
// import React, { useState, useEffect } from "react";
import PrivateRoutes from './PrivateRoutes';
import { Switch, Route, } from "react-router-dom";

const AppRoutes = () => {
    return (<Switch>
        <Route path="/about" exact>
            about
        </Route>
        <Route path="/contact" exact>
            contact
        </Route>
        <Route path="/" exact>
            Home
        </Route>
        <Route path="/login" exact>
            <Login />
        </Route>
        <Route path="/register" exact>
            <Register />
        </Route>
        <PrivateRoutes path="/users" component={Users} />
        <Route path="/*" exact>
            404 not found
        </Route>
    </Switch>)
}

export default AppRoutes;