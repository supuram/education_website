import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from './auth';
import './AdminLogin.css'

export default function AdminLogin(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAdminLogin = async(e) => {
        e.preventDefault()
        try{
            await login(username, password)
            navigate('/adminlogin')
        }
        catch (error) {
            alert(error.message);
        }
    }
    return(
        <div>
            <h1 className="h1AdminLogin">Administrator Login</h1>
            <form className='formRegister' onSubmit={handleAdminLogin}>
                <input
                    className='inputRegister'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <input
                    className='inputRegister'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='divRegister'>        
                    <button className='buttonRegister' type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}