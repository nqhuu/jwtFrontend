import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom'
import Login from "../components/Login/Login";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
    let history = useHistory();

    const { user } = useContext(UserContext);

    useEffect(() => {
        let session = JSON.parse(sessionStorage.getItem("account"));
        if (!session || (session && session.Authenticated === false)) {
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