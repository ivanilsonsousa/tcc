import axios from 'axios';

// Acessando a variável de ambiente para o baseURL
const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL, // Define o baseURL a partir do .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
