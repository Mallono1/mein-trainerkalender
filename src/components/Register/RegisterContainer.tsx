import React, { useState } from 'react';
import { BrainCircuit, Lock, Mail, MapPin, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRegisterUser } from '../../mutations/useRegisterUser';

const europeanCountries = [
  'Germany',
  'Austria',
  'Poland',
  'Czech Republic',
  'Switzerland',
  'Netherlands',
  'Belgium',
  'Denmark',
  'Luxembourg',
  'France',
];

const RegisterContainer: React.FC = () => {
  const {
    mutate: registerUser,
    isPending,
    error,
  } = useRegisterUser({
    onSuccess: (data) => {
      window.location.reload();
    },
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    setErrorMessage('');
    if (formData.email !== formData.repeatEmail) {
      return setErrorMessage('Emails do not match.');
    }
    if (formData.password !== formData.repeatPassword) {
      return setErrorMessage('Passwords do not match.');
    }
    registerUser(formData);
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
          

          <div className="flex justify-center mb-8 border-b border-black/20">
            <Link 
              to="/login"
              className="px-8 py-2 text-black text-xl relative opacity-70 hover:opacity-100"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="px-8 py-2 text-black text-xl relative opacity-100"
            >
              Register
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
            </Link>
          </div>

          <div className="max-w-md mx-auto flex flex-col gap-6">
            <div className="relative">
              <label className="text-black mb-2">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your first name"
                />
                <User className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your last name"
                />
                <User className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                Street
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your street"
                />
                <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                House Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your house number"
                />
                <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                Postal Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your postal code"
                />
                <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                City
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your city"
                />
                <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your phone number"
                />
                <Phone className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                Repeat Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="repeatEmail"
                  value={formData.repeatEmail}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Repeat your email"
                />
                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            <div className="relative">
              <label className="text-black mb-2">
                Repeat Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  className="w-full bg-white/40 border-b border-black/30 pl-10 pr-2 py-2 text-black placeholder-black/50 focus:outline-none focus:border-black backdrop-blur-sm"
                  placeholder="Repeat your password"
                />
                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 text-black/70" size={20} />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">
                {errorMessage}
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error.message}
              </p>
            )}

            <button
              onClick={handleRegister}
              className="w-full bg-black text-white py-3 mt-4 text-lg hover:bg-gray-800 transition-colors shadow-md"
              disabled={isPending}
            >
              {isPending ? 'Registering...' : 'Sign Up'}
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterContainer;
