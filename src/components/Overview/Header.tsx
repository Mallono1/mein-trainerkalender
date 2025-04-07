import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white px-[10rem] py-10 flex justify-between items-center">
      <span className="font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-2xl">
        Tennis App
      </span>

      <ul className="flex space-x-12 text-sm">
        <li className="cursor-pointer">Features</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Pricing</li>
      </ul>
      <div className="space-x-4">
        <button
          onClick={() => {
            navigate('/login');
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-500 font-semibold text-white text-sm px-5 py-2 rounded-md cursor-pointer transition-transform transform hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate('/register');
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-500 font-semibold text-white text-sm px-5 py-2 rounded-md cursor-pointer transition-transform transform hover:scale-105"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Header;
