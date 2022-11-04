import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './config/axios';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toast } from './components/Toast';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toast />
      <App />
    </Provider>
  </React.StrictMode>
);
