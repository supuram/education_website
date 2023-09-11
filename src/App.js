import React from "react";
import Home from "./Home/Home.js";
import Subjects from './Subjects/Subjects.js'
import Contact from './Contact/Contact.js'
import Coding from "./Subjects/Coding.js";
import Science from "./Subjects/Science.js";
import Maths from "./Subjects/Maths.js";
import English from "./Subjects/English.js";
import IITJEE from "./Subjects/IITJEE.js";
import Neet from "./Subjects/Neet.js";
import Gre from "./Subjects/Gre.js";
import Foundation from "./Subjects/Foundation.js";
import Humanities from "./Subjects/Humanities.js";
import Engineering from "./Subjects/Engineering.js";
import WebDev from "./CodingComponents/WebDev.js";
import ReactTeach from './CodingComponents/ReactTeach.js'
import Python from "./CodingComponents/Python.js";
import Javascript from "./CodingComponents/Javascript.js";
import TeacherLogin from './Login/TeacherLogin.js'
import AfterAdminLogin from "./Login/AfterAdminlogin/AfterAdminLogin.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App(){
    return(
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/subjects' element={<Subjects />}></Route>
                    <Route path='/contactus' element={<Contact />}></Route>
                    <Route path='/coding' element={<Coding />}></Route>
                    <Route path='/science' element={<Science />}></Route>
                    <Route path='/maths' element={<Maths />}></Route>
                    <Route path='/english' element={<English />}></Route>
                    <Route path='/iitjee' element={<IITJEE />}></Route>
                    <Route path='/neet' element={<Neet />}></Route>
                    <Route path='/gre' element={<Gre />}></Route>
                    <Route path='/foundation' element={<Foundation />}></Route>
                    <Route path='/humanities' element={<Humanities />}></Route>
                    <Route path='/engineering' element={<Engineering />}></Route>
                    <Route path='/teacherlogin' element={<TeacherLogin />}></Route>
                    <Route path='/coding/webdev' element={<WebDev />}></Route>
                    <Route path='/coding/reactteach' element={<ReactTeach />}></Route>
                    <Route path='/coding/python' element={<Python />}></Route>
                    <Route path='/coding/javascript' element={<Javascript />}></Route>
                    <Route path='/adminlogin' element={<AfterAdminLogin />}></Route>
                </Routes>
            </Router>
        </div>
    )
}