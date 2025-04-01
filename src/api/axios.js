import axios from 'axios';

// Conectado backend
const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    withCredentials: true
});

export default instance;