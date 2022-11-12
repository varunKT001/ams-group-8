import React from 'react';
import { ToastContainer } from 'react-toastify';

export function Toast() {
  return (
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      rtl={false}
      pauseOnHover
    />
  );
}
