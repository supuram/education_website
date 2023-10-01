import React, { useState, useEffect, useRef } from "react";
import './AfterEducatorLogin.css'
import { fetchStudents_for_AfterEducatorLogin, updateTotalClassesCount } from './../auth.js'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Logout from "../Logout";
import ButtonAdd from "./ButtonAdd.js";
import ButtonDelete from './ButtonDelete.js'
const db = firebase.firestore();

export default function AfterEducatorLogin() {
  const [studentInfo, setStudentInfo] = useState([]);
  const [clicked, setClicked] = useState(false); 
  const [counts, setCounts] = useState([])
  const emailRef = useRef(null);

  const handleClick = async () => {
    try {
      const user = firebase.auth().currentUser; // Get the current user
      if (user) {
        emailRef.current = user.email;
        const email = user.email;
        console.log(email);
        db.collection('employeelogin')
          .where('email', '==', email)
          .get()
          .then(async (querySnapshot) => {
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data = doc.data();
                const emailUser = data.email;
                const fetchedStudentInfo = await fetchStudents_for_AfterEducatorLogin(emailUser);
                const initialCounts = Array(fetchedStudentInfo.length).fill(0);
                setCounts(initialCounts);
                setStudentInfo(fetchedStudentInfo);
                setClicked(true); 
            }
          });
      } 
      else {
        console.log('No user is signed in');
      }
    } catch (error) {
      console.error("Error fetching student info = ", error);
    }
  }

  const handleClickAdd = async(index, email) => {
    const studentname = studentInfo[index].studentname; 
    const subjectname = studentInfo[index].subjectname

    const currentCount = await getCurrentClassCount(email, studentname, subjectname);
    const updatedCount = currentCount + 1;
    await updateTotalClassesCount(studentname, subjectname, updatedCount, email);

    const newCounts = [...counts]; // Create a copy of counts
    newCounts[index] = newCounts[index] + 1
    setCounts(newCounts); 
  }

  const handleClickDelete = async(index, email) => {
    const studentname = studentInfo[index].studentname; 
    const subjectname = studentInfo[index].subjectname
    const currentCount = await getCurrentClassCount(email, studentname, subjectname);
    const updatedCount = currentCount - 1;
    await updateTotalClassesCount(studentname, subjectname, updatedCount, email);

    const newCounts = [...counts]; // Create a copy of counts
    newCounts[index] = newCounts[index] - 1
    setCounts(newCounts); 
  }

  const getCurrentClassCount = async (email, studentname, subjectname) => {
    try {
      const educatorRef = await db.collection('employeelogin')
        .where('email', '==', email)
        .get();
  
      if (!educatorRef.empty) {
        const educatorDoc = educatorRef.docs[0];
        const currentStudentInfo = educatorDoc.data().studentinfo || [];
        const student = currentStudentInfo.find((s) => s.studentname === studentname && s.subjectname === subjectname);
  
        if (student) {
          return student.classcount || 0;
        }
      }
  
      return 0; 
    } 
    catch (error) {
      throw error;
    }
  };
  
  return (
    <div>
      <Logout />
      <div className="divAfterEducatorLogin">
        <div>
          <h3 onClick={handleClick} style={{ cursor: 'pointer' }}>List of Students</h3>
        </div>
        <div>
          {clicked && studentInfo.length > 0 && (
            <table border='1' cellSpacing='0' style ={{ width:'60%', height:'100px' }}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Subject Name</th>
                  <th>Add Classes</th>
                  <th>Delete Classes</th>
                  <th>Total Classes</th>
                </tr>
              </thead>
              <tbody>
                {studentInfo.map((student, index) => (
                  <tr key={index}>
                    <td>{student.studentname}</td>
                    <td>{student.subjectname}</td>
                    <td><ButtonAdd count={counts[index]} onClick={() => handleClickAdd(index, emailRef.current)}></ButtonAdd>
                    </td>
                    <td><ButtonDelete count={counts[index]} onClick={() => handleClickDelete(index, emailRef.current)}></ButtonDelete></td>
                    <td>{student.classcount + counts[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}