import React, { useContext, useState } from 'react';

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        Authenticated: false,
        token: "",
        account: {}
    });
    const loginContext = (data) => {
        setUser(data);
    }

    const logout = () => {
        setUser({
            Authenticated: false,
            token: "",
            account: {}
        });
    }
    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };