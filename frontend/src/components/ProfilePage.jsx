import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  // const { user, logout } = useAuth();
  // const navigate = useNavigate();

  // if (!user) {
  //   navigate('/');
  //   return null;
  // }

  return (
    <div className="container mt-4">
      <h1>User Profile</h1>
      {/* <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phone_number}</p>
      <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
      <button onClick={logout} className="btn btn-sucess">Logout</button> */}
    </div>
  );
};

export default ProfilePage;
