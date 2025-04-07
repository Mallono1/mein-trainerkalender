import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, EllipsisVertical, Plus } from 'lucide-react';
import AddNewTaskModal from './AddNewTaskModal';

type User = {
  name: string;
  avatarUrl: string;
};

type Category = {
  name: string;
  textColor: string;
  backgroundColor: string;
};

type Task = {
  id: string;
  subject: string;
  category: Category;
  description: string;
  createdAt: string;
  assignedUsers: User[];
};

type ColumnType = 'todo' | 'inProgress' | 'done' | 'inReview';

// const initialTasks: Record<ColumnType, Task[]> = {
//   todo: [],
//   inProgress: [],
//   inReview: [],
//   done: [],
// };

const dummyTasks: Record<ColumnType, Task[]> = {
  todo: [
    {
      id: '1',
      subject: 'Create Wireframes',
      category: {
        name: 'Design',
        textColor: '#ff9800',
        backgroundColor: '#fff3e0',
      },
      description: 'Prepare UI wireframes for approval',
      createdAt: format(new Date(), 'PPP p'),
      assignedUsers: [
        { name: 'Alice', avatarUrl: 'https://i.pravatar.cc/40?img=1' },
      ],
    },
    {
      id: '6',
      subject: 'Make API Gateway',
      category: {
        name: 'Development',
        textColor: '#4caf50',
        backgroundColor: '#e8f5e9',
      },
      description: 'Prepare an API for gatewoy payment',
      createdAt: format(new Date(), 'PPP p'),
      assignedUsers: [
        { name: 'Alice', avatarUrl: 'https://i.pravatar.cc/40?img=5' },
      ],
    },
  ],
  inProgress: [
    {
      id: '2',
      subject: 'Develop Login Feature',
      category: {
        name: 'Development',
        textColor: '#4caf50',
        backgroundColor: '#e8f5e9',
      },
      description: 'Implement user authentication',
      createdAt: format(new Date(), 'PPP p'),
      assignedUsers: [
        { name: 'Bob', avatarUrl: 'https://i.pravatar.cc/40?img=2' },
        { name: 'Alice', avatarUrl: 'https://i.pravatar.cc/40?img=5' },
      ],
    },
  ],
  inReview: [
    {
      id: '3',
      subject: 'Testing Payment Flow',
      category: {
        name: 'QA',
        textColor: '#9c27b0',
        backgroundColor: '#f3e5f5',
      },
      description: 'Ensure checkout process works',
      createdAt: format(new Date(), 'PPP p'),
      assignedUsers: [
        { name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/40?img=3' },
      ],
    },
  ],
  done: [
    {
      id: '4',
      subject: 'Deploy to Production',
      category: {
        name: 'Deployment',
        textColor: '#2196f3',
        backgroundColor: '#e3f2fd',
      },
      description: 'Release the latest version',
      createdAt: format(new Date(), 'PPP p'),
      assignedUsers: [
        { name: 'David', avatarUrl: 'https://i.pravatar.cc/40?img=4' },
      ],
    },
  ],
};

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [newSubject, setNewSubject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] =
    useState<boolean>(false);

  const toggleDropdown = (taskId: string) => {
    setOpenTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const addTask = () => {
    // if (!newSubject.trim() || !newDescription.trim()) return;
    // const newTaskObj: Task = {
    //   id: Date.now().toString(),
    //   subject: newSubject,
    //   category: {
    //     name: 'General',
    //     textColor: '#555',
    //     backgroundColor: '#f5f5f5',
    //   },
    //   description: newDescription,
    //   createdAt: format(new Date(), 'PPP p'),
    //   assignedUsers: [],
    // };
    // setTasks((prev) => ({
    //   ...prev,
    //   todo: [...prev.todo, newTaskObj],
    // }));
    // setNewSubject('');
    // setNewDescription('');
    setIsAddNewTaskModalOpen(true);
  };

  return (
    <>
      {isAddNewTaskModalOpen && (
        <AddNewTaskModal
          isOpen={isAddNewTaskModalOpen}
          onClose={() => setIsAddNewTaskModalOpen(false)}
        />
      )}
      <div className='h-[90vh] flex gap-3 mt-5 select-none'>
        {Object.keys(tasks).map((column) => {
          const columnKey = column as ColumnType;
          return (
            <div key={columnKey} className='column w-full'>
              <h2 className='flex gap-2 text-sm font-bold text-gray-700 mb-3 uppercase'>
                <span className='px-3 rounded-sm bg-indigo-200 text-indigo-700'>
                  {columnKey.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className='font-medium text-slate-400'>
                  {tasks[columnKey].length}
                </span>
              </h2>

              <div className='space-y-2 min-h-[100px]'>
                {tasks[columnKey].length === 0 ? (
                  <div className='p-3 bg-white border border-gray-100 rounded-lg shadow-sm text-center text-gray-500 italic'>
                    No tasks available
                  </div>
                ) : (
                  tasks[columnKey].map((task) => (
                    <div
                      key={task.id}
                      className='task p-3 bg-white border border-gray-100 rounded-lg shadow-sm relative'
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <p
                          className='text-xs font-medium px-2 py-1 rounded-md w-fit'
                          style={{
                            color: task.category.textColor,
                            backgroundColor: task.category.backgroundColor,
                          }}
                        >
                          {task.category.name}
                        </p>
                        <EllipsisVertical
                          onClick={() => toggleDropdown(task.id)}
                          size={16}
                          className='cursor-pointer'
                        />
                      </div>

                      {openTaskId === task.id && (
                        <div className='absolute right-2 top-10 bg-white border border-slate-300 rounded-md text-xs text-slate-600 shadow-md w-25 z-10'>
                          <ul>
                            <li className='py-1 px-3 cursor-pointer hover:bg-slate-100'>
                              Next step
                            </li>
                            <li className='py-1 px-3 cursor-pointer hover:bg-slate-100'>
                              Details
                            </li>
                            <li className='py-1 px-3 cursor-pointer hover:bg-slate-100'>
                              Notes
                            </li>
                          </ul>
                        </div>
                      )}

                      <h3 className='font-semibold text-md'>{task.subject}</h3>
                      <p className='text-sm text-gray-600 mt-1'>
                        {task.description}
                      </p>

                      <div className='flex items-center gap-2 mt-3'>
                        <Calendar size={15} className='text-gray-400' />
                        <span className='text-xs text-gray-400'>
                          {task.createdAt}
                        </span>
                      </div>

                      <div className='flex items-center -space-x-2 mt-3'>
                        {task.assignedUsers.map((user) => (
                          <img
                            key={user.name}
                            src={user.avatarUrl}
                            alt={user.name}
                            className='w-7 h-7 rounded-full border-2 border-gray-400'
                            title={user.name}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}

                {columnKey === 'todo' && (
                  <div className='mt-2'>
                    <button
                      onClick={addTask}
                      className='flex justify-center items-center gap-1 mt-3 w-full p-2 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white rounded-md hover:bg-blue-600 transition cursor-pointer'
                    >
                      <Plus size={18} /> Create Task
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default KanbanBoard;
