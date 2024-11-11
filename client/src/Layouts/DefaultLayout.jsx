import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import NavLink from "../Components/NavLink";
import { useAppContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";
import SplashScreen from "../Pages/SplashScreen";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useAppContext();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    // Afficher le SplashScreen pendant 3 secondes à chaque chargement de la page
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000); // 3 secondes de SplashScreen

    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  if (!token && !showSplashScreen) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    axiosClient.post("/api/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div>
      {showSplashScreen ? (
        <SplashScreen />
      ) : (
        <>
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
              <Outlet />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
