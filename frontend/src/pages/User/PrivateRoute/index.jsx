import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const UserPrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (!user.data) {
    return <Navigate to='/user/login' />;
  } else {
    return children;
  }
};
