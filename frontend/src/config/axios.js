import Axios from 'axios';

Axios.defaults.withCredentials = true;
Axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api';
