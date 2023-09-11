import React from "react";
import './Lowestbar.css'
import { useNavigate, Link } from 'react-router-dom';

export default function Lowestbar(){
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path)
    }

    return(
        <div className="maindivLowestbar">
            <div className="childdivLowestbar1">
                <h1>About Tutorverse</h1>
                <p>Tutorverse is a revolutionary learning platform for quality online and on-campus education from the most experienced faculty. We offer two years integrated classroom coaching for IIT-JEE and NEET aspirants at our Hyderabad campus. We provide online coaching for all kinds of competitive exams such as IIT-JEE, NEET, SAT, ACT, PSAT, Subjective SAT, AP & Olympiads, and Foundation Courses for students of Class 6 to 10 (CBSE, ICSE & State Syllabus).

                Tutorverse's faculty has huge experience with a proven track record in teaching English, Maths, Physics, Chemistry, Botany, Zoology, Reading Comprehension, and so on. Tutorverse is driven to provide the best online and on-campus programs to students across India, US, Singapore, and Middle East regions</p>
            </div>
            <div className="childdivLowestbar2">
                <h1>Courses</h1>
                <ul>
                    <li onClick={() => handleClick('/iitjee')} style={{ cursor: 'pointer' }}>IITJEE</li>
                    <li onClick={() => handleClick('/neet')} style={{ cursor: 'pointer' }}>NEET</li>
                    <li onClick={() => handleClick('/iitjee')} style={{ cursor: 'pointer' }}>Career Counselling</li>
                    <li onClick={() => handleClick('/iitjee')} style={{ cursor: 'pointer' }}>Mentorship</li>
                    <li onClick={() => handleClick('/iitjee')} style={{ cursor: 'pointer' }}>SRP</li>
                    <li onClick={() => handleClick('/english')} style={{ cursor: 'pointer' }}>English</li>
                    <li onClick={() => handleClick('/coding')} style={{ cursor: 'pointer' }}>Computer</li>
                </ul>
            </div>
            <div className="childdivLowestbar3">
                <h1>Links</h1>
                <ul>
                    <li><Link to='/teacherlogin'>Teacher Login</Link></li>
                </ul>
            </div>
        </div>
    )
}