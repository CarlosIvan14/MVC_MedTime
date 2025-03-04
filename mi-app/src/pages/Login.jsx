// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from "../Components/DarkModeToggle";
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }
      const data = await response.json();
      localStorage.setItem('userId', data.id);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.name);
      if (data.role === 'medico') {
        navigate('/medico/dashboard');
      } else if (data.role === 'paciente') {
        navigate('/paciente/calendar');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <header className="p-4 flex justify-end">
          <DarkModeToggle />
        </header>
      <div className="bg-white p-8 dark:bg-gray-700 rounded-2xl shadow max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <img
            src="/MedTimeLogo.png"
            alt="MedTime Logo"
            className="w-32 h-auto"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Hello Again!</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-full text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-full text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-700 text-white font-semibold hover:bg-blue-800 rounded-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
