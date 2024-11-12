import { Link } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";
import axiosClient from "../axios-client"
import { useAppContext } from "../Contexts/ContextProvider";

export default function Register () {
    const {setUser,setToken} = useAppContext()
    const [errors,setErrors] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleRegister(e){
        e.preventDefault();
        console.log(formData)
        axiosClient.post('/api/register', formData)
        .then(({data}) => {
            setToken(data.token)
            setUser(data.user)
        })
        .catch(error => {
            const response = error.response
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
                <h1 className="text-xl font-semibold mb-3 text-center">Register a new account</h1>
                <form onSubmit={handleRegister}>
                    {errors && (
                        <div className="bg-red-500 text-white p-3 mb-3 rounded">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
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

                    <button className="bg-blue-500 p-4 text-white w-full rounded hover:bg-slate-700">Register</button>
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