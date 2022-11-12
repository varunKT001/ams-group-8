import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AdminPrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (!user.data) {
    return <Navigate to='/admin/login' />;
  } else if (user.data.role !== 'admin') {
    return <Navigate to={`/${user.data.role}/dashboard`} />;
  } else {
    return children;
  }
};
