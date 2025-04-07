import React, { memo } from 'react';
import { Search } from 'lucide-react';

interface SearchBarInputProps {
  searchInputRef: React.RefObject<HTMLInputElement>;
}

const SearchBarInput: React.FC<SearchBarInputProps> = memo(
  ({ searchInputRef }) => (
    <div className='relative'>
      <Search className='absolute top-2 left-3 text-slate-500' size={17} />
      <input
        ref={searchInputRef}
        type='text'
        placeholder='Search...'
        className='bg-gray-200 w-[300px] pl-9 pr-16 py-2 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#90e0ef] focus:border-transparent focus:bg-slate-100'
      />
      <span className='absolute top-[50%] right-3 transform -translate-y-1/2 text-gray-500 text-[10px] bg-gray-300 px-2 py-[2px] rounded-md'>
        Ctrl + K
      </span>
    </div>
  )
);

export default SearchBarInput;
