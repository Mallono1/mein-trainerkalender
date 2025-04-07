import React, { useState } from 'react';

const PricingPlans = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className='bg-white py-26 px-6'>
      <h1 className='text-center mb-10 text-4xl font-bold text-slate-700'>
        Choose your plan
      </h1>
      {/* Toggle Switch */}
      <div className='flex justify-center mb-10'>
        <span className='text-gray-500 mr-3'>Monthly</span>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='sr-only peer'
            checked={isAnnual}
            onChange={() => setIsAnnual(!isAnnual)}
          />
          <div className='w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 relative'>
            <div className='absolute left-1 top-1 bg-white w-5 h-5 rounded-full peer-checked:left-8 transition'></div>
          </div>
        </label>
        <span className='text-blue-600 font-semibold ml-3'>
          Annual <span className='text-sm text-blue-400'>20% off</span>
        </span>
      </div>

      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 h-[35rem]'>
        <div className='border border-gray-300 p-6 rounded-lg text-center shadow-sm'>
          <h3 className='text-xl font-semibold text-gray-800'>Basic</h3>
          <p className='text-gray-500'>Start with the basics</p>
          <p className='text-3xl font-bold mt-4'>$0</p>
          <button className='border border-blue-600 text-blue-600 px-5 py-2 rounded-md mt-4'>
            Get started
          </button>
          <hr className='my-4' />
          <ul className='text-gray-600 space-y-2'>
            <li>✔ 3 templates</li>
            <li>✔ 4 campaigns per month</li>
            <li>✔ 1,000 MAUs</li>
            <li>✔ 5MB file size limit</li>
          </ul>
        </div>

        <div className='border border-blue-600 p-6 rounded-lg text-center shadow-lg relative'>
          <span className='absolute top-0 -translate-y-1/2 bg-blue-600 text-white text-sm px-3 py-1 rounded-full'>
            Recommended
          </span>
          <h3 className='text-xl font-semibold text-gray-800'>Essentials</h3>
          <p className='text-gray-500'>Unleash the power of automation</p>
          <p className='text-3xl font-bold text-blue-600 mt-4'>
            ${isAnnual ? '8' : '10'}
          </p>
          <p className='text-gray-500 text-sm'>
            per template / month, billed {isAnnual ? 'annually' : 'monthly'}
          </p>
          <button className='border border-blue-600 text-blue-600 px-5 py-2 rounded-md mt-4'>
            Get started
          </button>
          <hr className='my-4' />
          <ul className='text-gray-600 space-y-2'>
            <li>✔ Minimum 5 templates</li>
            <li>✔ 12 campaigns per month</li>
            <li>✔ 25,000 MAUs</li>
            <li>✔ 100MB file size limit</li>
            <li>✔ Analytics</li>
          </ul>
        </div>

        {/* Professional Plan */}
        <div className='border border-gray-300 p-6 rounded-lg text-center shadow-sm'>
          <h3 className='text-xl font-semibold text-gray-800'>Professional</h3>
          <p className='text-gray-500'>Tailored for your business needs</p>
          <p className='text-3xl font-bold text-gray-800 mt-4'>Custom</p>
          <button className='border border-blue-600 text-blue-600 px-5 py-2 rounded-md mt-4'>
            Contact us
          </button>
          <hr className='my-4' />
          <ul className='text-gray-600 space-y-2'>
            <li>✔ Custom templates</li>
            <li>✔ Custom campaigns</li>
            <li>✔ Custom MAUs</li>
            <li>✔ No file size limit</li>
            <li>✔ Integrations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
