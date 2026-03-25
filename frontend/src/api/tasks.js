import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/tasks',
});

export const getTasks = () => API.get('/');
export const createTask = (data) => API.post('/', data);
export const updateTask = (id, data) => API.put(`/${id}/`, data);
export const deleteTask = (id) => API.delete(`/${id}/`);
