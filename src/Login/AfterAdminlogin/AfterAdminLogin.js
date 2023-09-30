import React, { useState } from "react";
import { educatorregisterbyadmins, students_assigned_to_educator } from "../auth.js";
import './AfterAdminLogin.css'
import Logout from "../Logout.js";

export default function AfterAdminLogin(){
    const [username, setUsername] = useState('');
    const [studentname, setStudentName] = useState('')
    const [subjectname, setSubjectName] = useState('')
    const [educatoremail, setEducatorEmail] = useState('')

    const handleRegisterEducator = async(e) => {
        e.preventDefault()
        try{
            await educatorregisterbyadmins(username)
            setUsername('')
        }
        catch (error) {
            alert(error.message);
        }
    }

    const handleAssignStudent = async(e) => {
        e.preventDefault()
        try{
            await students_assigned_to_educator(studentname, subjectname, educatoremail)
            setStudentName('')
            setSubjectName('')
            setEducatorEmail('')
        }
        catch (error) {
            alert(error.message);
        }
    }

    return(
        <div>
            <Logout />
            <form className='formRegister' onSubmit={handleRegisterEducator}>
                <input
                    className='inputRegister'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className='divRegister'>        
                    <button className='buttonRegister' type="submit">Register Educator</button>
                </div>
            </form>

            <form onSubmit={handleAssignStudent}>
                <h1 className="h1form">Assign a Student to an Educator</h1>
                <div className="divAssignStudentinAfterAdminLogin">
                    <input className="inputAssignStudentinAfterAdminLogin" type="text" placeholder="Student Name" value={studentname} onChange={(e) => setStudentName(e.target.value)} />
                    <input className="inputAssignStudentinAfterAdminLogin" type="text" placeholder="Subject Name" value={subjectname} onChange={(e) => setSubjectName(e.target.value)} />
                    <input className="inputAssignStudentinAfterAdminLogin" type="email" placeholder="Educator Email" value={educatoremail} onChange={(e) => setEducatorEmail(e.target.value)} />
                </div>
                <button className="buttonAssignStudentinAfterAdminLogin">Submit</button>
            </form>
        </div>
    )
}