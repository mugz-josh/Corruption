
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUserByEmail } from '../utils/storage';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const user = findUserByEmail(form.email);
    if (user && user.password === form.password) {
      localStorage.setItem('loggedInUserId', user.id);
      localStorage.setItem('isAdmin', user.isAdmin.toString());
      navigate(user.isAdmin ? '/admin' : '/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
