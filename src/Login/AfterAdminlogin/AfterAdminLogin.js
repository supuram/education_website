import React, { useState } from "react";
import { educatorregisterbyadmins, students_assigned_to_educator } from "../auth.js";
import './AfterAdminLogin.css'
import Logout from "../Logout.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const db = firebase.firestore();

export default function AfterAdminLogin(){
    const [username, setUsername] = useState('');
    const [studentname, setStudentName] = useState('')
    const [subjectname, setSubjectName] = useState('')
    const [educatoremail, setEducatorEmail] = useState('')
    const [classcount, setClasscount] = useState(0)

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
            await students_assigned_to_educator(studentname, subjectname, educatoremail, classcount)
            setStudentName('')
            setSubjectName('')
            setEducatorEmail('')
            setClasscount('')
        }
        catch (error) {
            alert(error.message);
        }
    }

    const handleDeleteStudent = async(e) => {
        e.preventDefault()
        try{
            await delete_educator(educatoremail)
            setEducatorEmail('')
        }
        catch (error) {
            alert(error.message);
        }
    }

    const delete_educator = async(email) => {
        try{
            const educatorRef = await db.collection('employeelogin')
            .where('email', '==', email)
            .get()

            if (!educatorRef.empty) {
                const educatorDoc = educatorRef.docs[0];
                await educatorDoc.ref.delete()
            }
        }
        catch (error) {
            throw error;
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
                <h1 className="h1form">ASSIGN A STUDENT TO AN EDUCATOR</h1>
                <div className="divAssignStudentinAfterAdminLogin">
                    <input className="inputAssignStudentinAfterAdminLogin" type="text" placeholder="Student Name" value={studentname} onChange={(e) => setStudentName(e.target.value)} />
                    <input className="inputAssignStudentinAfterAdminLogin" type="text" placeholder="Subject Name" value={subjectname} onChange={(e) => setSubjectName(e.target.value)} />
                    <input className="inputAssignStudentinAfterAdminLogin" type="email" placeholder="Educator Email" value={educatoremail} onChange={(e) => setEducatorEmail(e.target.value)} />
                </div>
                <button className="buttonAssignStudentinAfterAdminLogin">Submit</button>
            </form>

            <form onSubmit={handleDeleteStudent}>
                <h1 className="h1form">DELETE AN EDUCATOR</h1>
                <input className="inputAssignStudentinAfterAdminLogin" type="email" placeholder="Educator Email" value={educatoremail} onChange={(e) => setEducatorEmail(e.target.value)} />
                <button className="buttonAssignStudentinAfterAdminLogin">Submit</button>
            </form>
        </div>
    )
}