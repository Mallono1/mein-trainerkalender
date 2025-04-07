import React from 'react';
import WidgetCard from '../components/Dashboard/WidgetCard';
import PendingTaskWidget from '../components/Dashboard/PendingTaskWidget';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import WeeklySchedule from '@/components/ui/weekly-schedule';

const Dashboard: React.FC = () => {
  const userFName = useSelector(
    (state: RootState) => state.user.userName,
  ).split(' ')[0];

  return (
    <div className="p-6 max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 mb-10">
          {/* Calendar Section */}
          <div className="mt-6">
            <WeeklySchedule />
          </div>
        </div>

        {/* Statistics Dashboard Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Statistics</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <WidgetCard 
              title="Students" 
              amount={149} 
              increase={12}
              className="hover:shadow-lg transition-shadow duration-300" 
            />
            <WidgetCard 
              title="This Week Income" 
              amount={69} 
              increase={-34}
              className="hover:shadow-lg transition-shadow duration-300" 
            />
            <div className="lg:col-span-1 row-span-2">
              <WidgetCard 
                title="Tasks"
                className="h-full hover:shadow-lg transition-shadow duration-300"
              >
                <PendingTaskWidget />
              </WidgetCard>
            </div>
            <WidgetCard 
              title="Paid Students" 
              amount={69} 
              increase={-34}
              className="hover:shadow-lg transition-shadow duration-300" 
            />
            <WidgetCard 
              title="Unpaid Students" 
              amount={80} 
              increase={12}
              className="hover:shadow-lg transition-shadow duration-300" 
            />
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
