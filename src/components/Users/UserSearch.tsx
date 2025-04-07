// import React from 'react'
import { Search } from 'lucide-react';
import { memo } from 'react';

const UserSearch = memo(() => {
  return (
    <div className='relative'>
      <Search className='absolute top-2 left-3 text-slate-500' size={21} />
      <input
        type='text'
        placeholder='Search user...'
        className='w-[15rem] text-slate-500 ring ring-slate-300 bg-white py-2 pl-10 pr-3 text-sm rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#90e0ef] focus:bg-white'
      />
    </div>
  );
});

export default UserSearch;
