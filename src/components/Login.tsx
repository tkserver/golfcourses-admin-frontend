import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../axiosConfig';
import { AxiosError } from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/admin');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 429) {
          setMessage('Too many login attempts. Please try again later.');
          setIsDisabled(true); // Disable the form
        } else {
          console.error('Error logging in:', error);
          setMessage('Login failed');
        }
      } else {
        console.error('Unexpected error:', error);
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        {message && (
          <div className="mb-4 text-red-500 text-center">
            {message}
          </div>
        )}
        <form onSubmit={handleLogin} className="grid gap-6">
          <div className="flex flex-col">
            <label className="capitalize font-semibold mb-2 text-gray-700" htmlFor="username">Username</label>
            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <div className="flex flex-col">
            <label className="capitalize font-semibold mb-2 text-gray-700" htmlFor="password">Password</label>
            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isDisabled}
            />
          </div>
          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isDisabled}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
