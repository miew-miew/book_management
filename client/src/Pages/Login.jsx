import { Link } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";

export default function Login () {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleLogin(e){
        e.preventDefault();
        console.log(formData)
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/3 bg-gray-200 p-8 rounded">
                <h1 className="text-xl font-semibold mb-3 text-center">Login into your account</h1>
                <form onSubmit={handleLogin}>
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
                    
                    <button className="bg-slate-800 p-2 text-white w-full rounded hover:bg-slate-700">Login</button>
                </form>
                <div className="w-full flex justify-center gap-1">
                    <p>Don't have an account?</p> 
                    <Link 
                    to="/register"
                    className="text-blue-700"
                    >
                        Register here
                    </Link>    
                </div> 
            </div>
        </div>
    );
};