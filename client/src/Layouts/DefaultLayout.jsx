import { Navigate, Outlet } from "react-router-dom";
import NavLink from "../Components/NavLink";
import { useAppContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout () {
    const {user, token, setUser, setToken} = useAppContext()
    if(!token){
        return <Navigate to="/login" />
    }

    const handleLogout = () => {
        axiosClient.post('/api/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })   
    };

    return (
        <div>
            <header>
                <nav className="w-full flex items-center p-2 px-9 bg-gray-900 justify-between">
                    <NavLink to="/">Home</NavLink>
                    {user ? (
                        <div>
                            <NavLink onClick={handleLogout}>Log out</NavLink>
                        </div>
                    ) : (  
                        <div className="space-x-5">              
                            <NavLink to="/register">Register</NavLink>          
                            <NavLink to="/login">Login</NavLink>          
                        </div>
                    )}
                </nav>
            </header>
            <main>
                <div className="px-9 py-2">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
};