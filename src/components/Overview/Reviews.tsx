import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Reviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.9 });
  return (
    <motion.div
      className='absolute -bottom-20 mt-30 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[74rem]'
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
    >
      {/* Review 1 */}
      <div className='bg-gray-900 p-7 rounded-lg shadow-md flex items-center space-x-4'>
        <img
          src='https://randomuser.me/api/portraits/men/32.jpg'
          alt='User'
          className='w-12 h-12 rounded-full'
        />
        <div>
          <h4 className='font-semibold text-white'>James M.</h4>
          <p className='text-sm text-gray-400'>
            "This app has completely transformed how I manage my tennis
            lessons!"
          </p>
          <div className='text-yellow-400'>★★★★★</div>
        </div>
      </div>

      {/* Review 2 */}
      <div className='bg-gray-900 p-5 rounded-lg shadow-md flex items-center space-x-4'>
        <img
          src='https://randomuser.me/api/portraits/women/44.jpg'
          alt='User'
          className='w-12 h-12 rounded-full'
        />
        <div>
          <h4 className='font-semibold text-white'>Sophia L.</h4>
          <p className='text-sm text-gray-400'>
            "Easy to use, professional invoices, and my students love it!"
          </p>
          <div className='text-yellow-400'>★★★★★</div>
        </div>
      </div>

      {/* Review 3 */}
      <div className='bg-gray-900 p-5 rounded-lg shadow-md flex items-center space-x-4'>
        <img
          src='https://randomuser.me/api/portraits/men/45.jpg'
          alt='User'
          className='w-12 h-12 rounded-full'
        />
        <div>
          <h4 className='font-semibold text-white'>Michael T.</h4>
          <p className='text-sm text-gray-400'>
            "Highly recommend for any tennis coach looking to streamline
            scheduling!"
          </p>
          <div className='text-yellow-400'>★★★★★</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reviews;
