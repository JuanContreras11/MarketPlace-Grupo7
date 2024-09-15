import React, { useState, useEffect } from 'react';

const Form = ({ onSubmit, children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(e, token);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <form
      className="p-4 mx-auto max-w-[400] flex flex-col justify-around gap-3"
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
