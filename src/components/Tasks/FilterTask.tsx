import { ListFilterPlus } from 'lucide-react';
import React, { useState } from 'react';
import FilterTaskModal from './FilterTaskModal';

const FilterTask: React.FC = () => {
  const [isFilterTaskOpen, setIsFilterTaskOpen] = useState<boolean>(false);

  const handleCloseTaskModal = () => {
    setIsFilterTaskOpen(false);
  };

  const handleOpenTaskModal = () => {
    setIsFilterTaskOpen(true);
  };

  return (
    <>
      {isFilterTaskOpen && (
        <FilterTaskModal
          isOpen={isFilterTaskOpen}
          onClose={handleCloseTaskModal}
        />
      )}
      <button
        onClick={handleOpenTaskModal}
        className='flex items-center text-xs text-slate-700 cursor-pointer'
      >
        <ListFilterPlus size={21} />
        <span>Filter</span>
      </button>
    </>
  );
};

export default FilterTask;
