import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import InputBox from './InputBox';
import api from '../../lib/api';
import { AxiosError } from 'axios';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('auth/forgot-password', { email });
      if (response.status === 200) {
        setMessage('Password reset instructions have been sent to your email.');
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-grow min-h-screen font-ubuntu items-center justify-center p-2 lg:p-6 bg-gradient-to-tl from-[#0077b6] via-[#00b4d8] to-[#90e0ef]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        
        {message ? (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputBox
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />
            
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-3 rounded-lg bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-[#0077b6] text-sm hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 