import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
// import React, { useState, useEffect } from "react";
import PrivateRoutes from './PrivateRoutes';
import { Switch, Route, } from "react-router-dom";

const AppRoutes = () => {
    return (<Switch>
        <PrivateRoutes path="/news" />

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
        {/* <PrivateRoutes path="/" component={Home} /> */}

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