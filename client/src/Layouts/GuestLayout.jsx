import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../Contexts/ContextProvider";

export default function GuestLayout () {
    const {user, token} = useAppContext()
    if(token){
        return <Navigate to="/" />
    }

    return(
        <div>
            <Outlet/>
        </div>
    )
}