import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Form from './Form';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('Todos los campos son requeridos.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Formato de email inválido.');
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {email, password} ),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Usuario no encontrado.');
        } else if (response.status === 401) {
          throw new Error('Contraseña incorrecta.');
        } else {
          console.log(response);
          throw new Error('Login fallido. Por favor verifica tus credenciales e intenta de nuevo.');
        }
      }

      const data = await response.json();
      await login(data.success.token); // Asumiendo que tu backend devuelve un token
      setError('');
      setEmail('');
      setPassword('');
      navigate('/productos');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button
        type="submit"
        className="w-full rounded-full bg-red-600 p-3 text-white transition hover:bg-opacity-90"
      >
        Iniciar Sesion
      </button>
      {error && <p className="text-danger">{error}</p>}
    </Form>
  );
};

export default Login;
