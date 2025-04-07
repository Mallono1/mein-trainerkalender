import React from 'react';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';

const CalendarLayout: React.FC = () => {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex items-center justify-center min-h-[500px] py-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 w-[650px] mx-auto">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-transparent bg-clip-text">
            {format(selected || new Date(), 'MMMM yyyy')}
          </h2>
        </div>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          className="rounded-lg border-none w-full"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0",
            month: "space-y-3 w-full",
            caption: "flex justify-center relative items-center",
            caption_label: "text-lg font-bold text-gray-700",
            nav: "space-x-1 flex items-center",
            nav_button: "h-8 w-8 bg-blue-50 text-blue-600 hover:bg-blue-100 p-0 hover:opacity-100 rounded-full transition-colors",
            table: "w-full border-collapse",
            head_row: "flex",
            head_cell: "text-blue-600 font-semibold rounded-md w-[calc(100%/7)] h-8 flex items-center justify-center text-xs",
            row: "flex w-full mt-1",
            cell: "relative w-[calc(100%/7)] p-0 text-center text-xs focus-within:relative focus-within:z-20",
            day: "h-10 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 rounded-md transition-colors flex items-center justify-center",
            day_range_end: "day-range-end",
            day_selected: "bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white hover:text-white hover:from-[#00b4d8] hover:to-[#0077b6] focus:bg-blue-600 focus:text-white font-bold",
            day_today: "bg-blue-50 text-blue-600 font-bold",
            day_outside: "text-gray-300 opacity-50 aria-selected:bg-gray-100 aria-selected:text-gray-400 aria-selected:opacity-30",
            day_disabled: "text-gray-300 opacity-50 hover:bg-transparent",
            day_range_middle: "aria-selected:bg-blue-50 aria-selected:text-blue-600",
            day_hidden: "invisible",
          }}
        />
      </div>
    </div>
  );
};

export default CalendarLayout;
