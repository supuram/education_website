import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './auth.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function Logout(){
    const navigate = useNavigate();
    const handleLogout = async() => {
        await logout()
        navigate('/teacherlogin')
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                console.log("User is signed out");
            }
        });
        return () => unsubscribe();
    }, []);

    return(
        <div>
            <Link 
                onClick={handleLogout}
                style={{
                    textDecoration:'none'
                }}>Logout
            </Link>
        </div>
    )
}