import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AdminPrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (!user.data) {
    return <Navigate to='/admin/login' />;
  } else if (user.data.role !== 'admin') {
    toast.error(`The role ${user.data.role} cannot access this resource`);
    return <Navigate to={`/${user.data.role}/dashboard`} />;
  } else {
    return children;
  }
};
