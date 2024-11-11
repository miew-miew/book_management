import { createContext, useContext, useState } from "react";

const AppContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
});

export default function ContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('')

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    const setNotification = (message) => {
        _setNotification(message)
        setTimeout(() => {
            _setNotification('')
        }, 5000);
    }

    return (
        <AppContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
