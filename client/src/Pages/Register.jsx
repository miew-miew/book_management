import { Link } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";

export default function Register () {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleRegister(e){
        e.preventDefault();
        console.log(formData)

    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/3 bg-gray-200 p-8 rounded">
                <h1 className="text-xl font-semibold mb-3 text-center">Register a new account</h1>
                <form onSubmit={handleRegister}>
                    <Input 
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value}) } 
                    />
                    
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
                    
                    <Input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={formData.password_confirmation} 
                        onChange={(e) => setFormData({...formData, password_confirmation: e.target.value}) } 
                    />

                    <button className="bg-slate-800 p-2 text-white w-full rounded hover:bg-slate-700">Register</button>
                </form>
                <div className="w-full flex justify-center gap-1">
                    <p>Already have an account?</p> 
                    <Link 
                    to="/login"
                    className="text-blue-700"
                    >
                        Connect here
                    </Link>    
                </div> 
            </div>
        </div>
    );
};