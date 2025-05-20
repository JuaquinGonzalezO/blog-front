import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004/blog/v1', 
  headers: {
    'Content-Type': 'application/json'
  
  }
});



export default api;