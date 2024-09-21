// src/components/Auth.tsx
'use client';

import { useState } from 'react';
import { User } from '../types/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response;
      if (isLogin) {
        response = await axios.post('/api/auth/login', { email, password });
      } else {
        response = await axios.post('/api/auth/signup', { email, password });
      }
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push('/tasks');
    } catch (error) {
      console.error(error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
        >
          {isLogin ? 'Login' : 'Signup'}
        </button>
        <p className="mt-2">
          {isLogin ? 'New user? ' : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;