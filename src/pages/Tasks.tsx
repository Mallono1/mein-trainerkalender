/** @jsxImportSource react */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CalendarLayout from '../components/Tasks/CalendarLayout';
import AddVacationModal from '../components/Tasks/AddVacationModal';
import { CalendarPlus } from 'lucide-react';

const Calendar: React.FC = () => {
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);

  const handleAddVacation = (vacation: {
    startDate: string;
    endDate: string;
    reason: string;
  }) => {
    console.log('Adding vacation:', vacation);
    // TODO: Implement vacation addition logic
  };

  return (
    <div className='h-screen'>
      <div className='flex justify-between items-center'>
        <h1 className='pages_title'>Calendar</h1>
        <div className='flex items-center gap-5'>
          <button
            onClick={() => setIsVacationModalOpen(true)}
            className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg'
          >
            <CalendarPlus size={18} />
            <span className='text-sm font-medium'>Add Vacation</span>
          </button>
        </div>
      </div>

      <CalendarLayout />

      {isVacationModalOpen && (
        <AddVacationModal
          isOpen={isVacationModalOpen}
          onClose={() => setIsVacationModalOpen(false)}
          onAdd={handleAddVacation}
        />
      )}
    </div>
  );
};

export default Calendar;
