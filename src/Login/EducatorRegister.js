import React, { useState } from 'react';
import { educatorregister } from './auth';
import './Register.css'

const EducatorRegister = () => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await educatorregister(username, dob, email, password);
      alert('Please check your email for verification.');
      setUsername('')
      setDob('')
      setEmail('')
      setPassword('')
    } 
    catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1 style={{color: 'black'}}>Educator Register</h1>
      <form className='formRegister' onSubmit={handleRegister}>
      <input
          className='inputRegister'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='dob'>Date of Birth</label>
        <input
        id='dob'
        className='inputRegister'
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        />
        <input
          className='inputRegister'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='inputRegister'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='divRegister'>        
          <button className='buttonRegister' type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
export default EducatorRegister;