import { Navigate, Outlet } from "react-router-dom";
import NavLink from "../Components/NavLink";

export default function DefaultLayout () {

    return (
        <div>
            <header>
                <nav className="w-full flex items-center p-2 px-9 bg-gray-900 justify-between">
                    <NavLink to="/">Home</NavLink>  
                    <div className="space-x-5">              
                        <NavLink to="/register">Register</NavLink>          
                        <NavLink to="/login">Login</NavLink>          
                    </div>
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