import React, { useState } from 'react';
import { BrainCircuit, Lock, Mail, User, Phone } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { Link } from 'react-router-dom';

const LoginContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    login({ email: formData.email, password: formData.password });
  };

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Register:', formData);
  };

  return (
    <div className="min-h-screen w-full flex relative">
      {/* Background image with gradient overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("/tennis1.jpg")',
          filter: 'brightness(0.9)'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#0077b6] via-[#00b4d8] to-[#90e0ef] opacity-90 z-10" />
      
      {/* Content overlay */}
      <div className="relative z-20 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <h3 className="flex items-center justify-center gap-2 text-black text-3xl mb-8">
            <BrainCircuit size={45} />
            Tennis App
          </h3>
          
          <p className="text-black text-sm mb-8 text-center max-w-md mx-auto">
            The ultimate platform for tennis coaches to manage their students
            efficiently. Track real-time income, schedule sessions, and generate
            invoices seamlessly. Simplify your coaching business with Tennis App.
          </p>

          <div className="flex justify-center mb-8 border-b border-black/20">
            <button 
              className={`px-8 py-2 text-black text-xl relative ${isLogin ? 'opacity-100' : 'opacity-70'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
              {isLogin && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </button>
            <Link 
              to="/register"
              className={`px-8 py-2 text-black text-xl relative ${!isLogin ? 'opacity-100' : 'opacity-70'} hover:opacity-100`}
            >
              Register
              {!isLogin && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </Link>
          </div>

          <div className="max-w-md mx-auto flex flex-col gap-6">
            {!isLogin && (
              <>
                <div className="relative">
                  <label className="flex items-center text-black mb-2">
                    <User className="mr-2" size={20} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    className="w-full bg-transparent border-b border-black/30 px-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-black mb-2">
                    <Phone className="mr-2" size={20} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    className="w-full bg-transparent border-b border-black/30 px-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black"
                    placeholder="Enter your phone number"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <label className="flex items-center text-black mb-2">
                <Mail className="mr-2" size={20} />
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                className="w-full bg-transparent border-b border-black/30 px-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <label className="flex items-center text-black mb-2">
                <Lock className="mr-2" size={20} />
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                className="w-full bg-transparent border-b border-black/30 px-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black"
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={isLogin ? handleLogin : handleRegister}
              className="w-full bg-black text-white py-3 mt-4 text-lg hover:bg-gray-800 transition-colors shadow-md"
            >
              {isLogin ? 'Sign In' : 'Register'}
            </button>

            {isLogin && (
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-[#0077b6] text-sm text-right font-ubuntu"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
