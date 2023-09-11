import React from "react";
import AdminLogin from "./AdminLogin.js";
import EducatorLogin from "./EducatorLogin.js";

export default function TeacherLogin(){
    return(
        <div>
            <AdminLogin />
            <EducatorLogin />
        </div>
    )
}