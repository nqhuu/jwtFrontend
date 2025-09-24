import { Route, Redirect } from "react-router-dom";
import { useEffect, useContext } from "react";
import Login from "../components/Login/Login";
import { UserContext } from "../context/UserContext";


const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    useEffect(() => {

    }, []);

    if ((user && user.Authenticated === true)) {
        return (
            <>
                <Route path={props.path} component={props && props.component ? props.component : Login} />
            </>
        )
    } else {
        return <Redirect to="/login" />
    }
}

export default PrivateRoutes;