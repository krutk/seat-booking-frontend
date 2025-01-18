// frontend/src/lib/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials: any) => api.post('/api/auth/login', credentials);
export const register = (userData: any) => api.post('/api/auth/register', userData);
export const getSeats = () => api.get('/api/bookings/seats');
export const bookSeats = (seatNumbers: any) => api.post('/api/bookings/book', { seatNumbers });
export const cancelBooking = (seatNumbers: any) => api.post('/api/bookings/cancel', { seatNumbers });
