import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const SearchTask: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className='border-2 border-blue-200 flex items-center rounded-full overflow-hidden bg-white shadow-md transition-all duration-300'>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isExpanded ? '17rem' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='overflow-hidden'
      >
        {isExpanded && (
          <input
            type='text'
            placeholder='Search...'
            className='px-5 py-2 text-slate-700 text-xs outline-none w-40 sm:w-60'
            autoFocus
          />
        )}
      </motion.div>
      <button
        className={`p-2 ${
          !isExpanded &&
          'bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white'
        } cursor-pointer rounded-full flex items-center justify-center transition-all`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <X size={18} className='text-slate-500' />
        ) : (
          <Search size={18} />
        )}
      </button>
    </div>
  );
};

export default SearchTask;
