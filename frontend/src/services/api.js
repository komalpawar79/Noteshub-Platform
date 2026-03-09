import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const auth = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (data) => API.put('/auth/profile', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserById: (id) => API.get(`/auth/user/${id}`),
  forgotPassword: (data) => API.post('/auth/forgot-password', data),
  resetPassword: (token, data) => API.post(`/auth/reset-password/${token}`, data)
};

export const notes = {
  upload: (formData) => API.post('/notes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params) => API.get('/notes', { params }),
  getById: (id) => API.get(`/notes/${id}`),
  like: (id) => API.post(`/notes/${id}/like`),
  download: (id) => API.post(`/notes/${id}/download`),
  updateStatus: (id, status) => API.put(`/notes/${id}/status`, { status }),
  delete: (id) => API.delete(`/notes/${id}`)
};

export const comments = {
  add: (noteId, text) => API.post(`/comments/${noteId}`, { text }),
  getAll: (noteId) => API.get(`/comments/${noteId}`),
  delete: (id) => API.delete(`/comments/${id}`)
};

export const admin = {
  getUsers: (params) => API.get('/admin/users', { params }),
  updateUserRole: (id, role) => API.put(`/admin/users/${id}/role`, { role }),
  blockUser: (id) => API.put(`/admin/users/${id}/block`),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  getStats: () => API.get('/admin/stats')
};

export default API;
