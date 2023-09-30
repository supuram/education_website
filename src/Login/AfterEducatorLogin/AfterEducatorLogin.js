import React, { useState, useEffect } from "react";
import './AfterEducatorLogin.css'
import { fetchStudents_for_AfterEducatorLogin } from './../auth.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Logout from "../Logout";

const db = firebase.firestore();

export default function AfterEducatorLogin(){
    const [studentInfo, setStudentInfo] = useState([]);
    const handleClick = async() => {
        try {
            const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                if (user) {            
                  const email = user.email;
                  console.log(email)
                  db.collection('employeelogin')
                  .where('email', '==', email)
                  .get()
                  .then(async(querySnapshot) => {
                  if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const data = doc.data();
                    const emailUser = data.email;
                    const fetchedStudentInfo = await fetchStudents_for_AfterEducatorLogin(emailUser);
                    setStudentInfo(fetchedStudentInfo);
                  }
                  })
                } 
                else {
                  console.log('No user is signed in');
                }
            })
            
            return () => {
                unsubscribe();
            };
        } 
        catch (error) {
            console.error("Error fetching student info = ", error);
        }
    }
    
    return(
        <div> 
            <Logout />
            <div className="divAfterEducatorLogin">
                <div>
                    <h3 onClick={handleClick} style={{ cursor: 'pointer' }}>List of Students</h3>
                </div>
                <div>
                    {studentInfo.map((student, index) => (
                        <div key={index}>
                            <p>Student Name: {student.studentname}</p>
                            <p>Subject Name: {student.subjectname}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}