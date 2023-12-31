import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { educatorlogin } from "./auth";
import './AdminLogin.css'

export default function EducatorLogin(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handleAdminLogin = async(e) => {
        e.preventDefault()
        try{
            await educatorlogin(username, email, password)
            navigate('/educatorlogin')
        }
        catch (error) {
            alert(error.message);
        }
    }
    return(
        <div>
            <h1 className="h1AdminLogin">Educator Login</h1>
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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