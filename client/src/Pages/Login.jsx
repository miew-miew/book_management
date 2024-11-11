import { Link } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useAppContext } from "../Contexts/ContextProvider";

export default function Login () {
    const {setUser,setToken} = useAppContext()
    const [errors,setErrors] = useState(null)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleLogin(e){
        e.preventDefault();
        axiosClient.post('/api/login', formData)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response
            if(response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors)
                }else{
                    setErrors({
                        email: [response.data.message]
                    })
                }                    
            }
        })
    }

    return (
        <div className="h-screen flex justify-center p-8">
            <div className="w-1/3 flex flex-col justify-center bg-gray-200 gap-4 p-8 rounded-sm">
                <span>Library's PWA</span>
                <h1 className="text-xl font-semibold mb-3 text-center">Login into your account</h1>
                <form onSubmit={handleLogin}>
                    {errors && (
                        <div className="bg-red-500 text-white p-3 mb-3 rounded">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value}) } 
                    />
                    <Input 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value}) } 
                    />
                    <span className="flex py-4">Password forgeten ?</span>
                    <button className="bg-blue-500 p-4 text-white w-full rounded hover:bg-slate-700">Login</button>
                </form>
                <div className="w-full flex justify-center gap-1">
                    <p>Don't have an account?</p> 
                    <Link 
                    to="/register"
                    className="text-blue-500"
                    >
                        Register here
                    </Link>    
                </div> 
            </div>
        </div>
    );
};