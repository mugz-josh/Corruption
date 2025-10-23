import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

import { saveUser } from '../utils/storage';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newUser: User = {
      id: Date.now().toString(),
      ...form,
      isAdmin: false,
    };
    saveUser(newUser);
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default RegisterPage;
