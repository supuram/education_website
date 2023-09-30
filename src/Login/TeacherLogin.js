import React from "react";
import AdminLogin from "./AdminLogin.js";
import EducatorLogin from "./EducatorLogin.js";
import EducatorRegister from './EducatorRegister.js'

export default function TeacherLogin(){
    return(
        <div>
            <AdminLogin />
            <EducatorRegister />
            <EducatorLogin />
        </div>
    )
}