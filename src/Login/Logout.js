import React from "react";
import { auth } from './../firebase.js';
import { Link } from 'react-router-dom';

export default function Logout(){
    const handleLogout = () => {
        auth.signOut()
          .then(() => {
          })
          .catch((error) => {
            console.log(error);
          });
    };
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