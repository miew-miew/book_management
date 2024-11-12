import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavLink from "../Components/NavLink";
import { useAppContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useAppContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Fetch user information when the component loads
    useEffect(() => {
        axiosClient.get('/api/user')
            .then(({ data }) => {
                setUser(data);
            });
    }, []); // Add empty dependency array to avoid multiple calls

    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleLogout = () => {
        axiosClient.post('/api/logout')
            .then(() => {
                setUser({});
                setToken(null);
            });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <header>
                <nav className="w-full flex items-center py-2 px-9 bg-gray-900 justify-between">
                    <NavLink to="/">Home</NavLink>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <NavLink to="/book/create" className="text-white font-semibold bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-500">
                                Add A New Book
                            </NavLink>
                            {/* User name with dropdown toggle */}
                            <button onClick={toggleDropdown} className="text-white font-semibold">
                                {user.name}
                            </button>
                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-12 w-40 bg-white shadow-lg rounded-lg">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
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
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
