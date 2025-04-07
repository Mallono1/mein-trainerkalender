import React from 'react';
import Header from '../components/Overview/Header';
import style from './../components/Overview/header.module.css';
import Reviews from '../components/Overview/Reviews';
import Plans from '../components/Overview/Plans';

const Overview: React.FC = () => {
  return (
    <div className={style.bg_custom_gradient}>
      <Header />

      <div className='flex flex-col items-center justify-center text-white h-[100vh] -mt-20'>
        <h1 className='text-5xl font-bold text-center'>
          <span className={style.gradient_text}>Tennis Coach App</span> to
          Manage all your <br />
          <span className='text-white'>Data registers</span>
        </h1>
        <p className='text-gray-400 text-lg text-center max-w-2xl mt-4'>
          Manage coaching sessions effortlessly with an intuitive scheduling
          system. Track student progress, automate invoicing, and keep your
          training sessions organized—all in one place.
        </p>
        <div className='mt-6 flex space-x-4'>
          <button className='bg-slate-300 text-black px-10 py-3 rounded-md font-medium'>
            Buy for $8
          </button>
          <button className={style.gradient_border}>Learn More</button>
        </div>
        <Reviews />
      </div>
      <Plans />
    </div>
  );
};

export default Overview;
