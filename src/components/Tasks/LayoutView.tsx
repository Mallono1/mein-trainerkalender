import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Calendar, LayoutGrid, List } from 'lucide-react';
import { setViewLayout } from '../../slicers/taskSlicer';

const LayoutView: React.FC = () => {
  const dispatch = useDispatch();
  const activeLayout = useSelector((state: RootState) => state.task.viewLayout);

  const views = [
    { name: 'Board', icon: <LayoutGrid size={16} /> },
    { name: 'List', icon: <List size={16} /> },
    { name: 'Calendar', icon: <Calendar size={16} /> },
  ] as const;

  const handleChangeActiveView = (viewName: 'board' | 'list' | 'calendar') => {
    dispatch(setViewLayout(viewName));
  };

  return (
    <div className='flex space-x-1 bg-gray-100 p-1 rounded-lg bg-white border border-gray-200 shadow-sm'>
      {views.map((view) => (
        <button
          key={view.name}
          onClick={() =>
            handleChangeActiveView(
              view.name.toLowerCase() as 'board' | 'list' | 'calendar'
            )
          }
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
            activeLayout === view.name.toLowerCase()
              ? 'bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white shadow'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          {view.icon}
          {view.name}
        </button>
      ))}
    </div>
  );
};

export default LayoutView;
