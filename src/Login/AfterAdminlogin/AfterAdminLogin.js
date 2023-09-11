import React, { useState } from "react";
import { educatorregister } from "../auth.js";

export default function AfterAdminLogin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegisterEducator = async(e) => {
        e.preventDefault()
        try{
            await educatorregister(email, password)
            setEmail('')
            setPassword('')
        }
        catch (error) {
            alert(error.message);
        }
    }

    return(
        <div>
            <form className='formRegister' onSubmit={handleRegisterEducator}>
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
                    <button className='buttonRegister' type="submit">Register Educator</button>
                </div>
            </form>
        </div>
    )
}