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
      setError('Invalid email format.');
      return;
    }
    navigate('/productos');
    try {
      await login(email, password); 
      setError('');
    } catch (err) {
      setError('Login fallido. Por favor verifica tus credenciales e intenta de nuevo.');
    }
  };

  return (
    <Form onSubmit={handleLogin}  >
      <InputField  type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button
              type="submit"
              className="w-full rounded-full  bg-red-600 p-3 text-white transition hover:bg-opacity-90"
            >Iniciar Sesion</button>
      {error && <p className="text-danger">{error}</p>}
    </Form>
  );
};

export default Login;
