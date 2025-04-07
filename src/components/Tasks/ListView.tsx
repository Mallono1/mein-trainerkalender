import React from 'react';
import { format } from 'date-fns';
import TableV2 from '../ui/TableV2';

interface Task {
  id: string;
  subject: string;
  category: {
    name: string;
    textColor: string;
    backgroundColor: string;
  };
  description: string;
  createdAt: string;
  assignedUsers: {
    name: string;
    avatarUrl: string;
  }[];
}

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
}

type ColumnType = 'todo' | 'inProgress' | 'done' | 'inReview';

const columns: Column<Task>[] = [
  { key: 'subject', label: 'Task' },
  {
    key: 'category',
    label: 'Category',
    render: (task) => (
      <span
        className='px-2 py-1 text-sm rounded-md'
        style={{
          color: task.category.textColor,
          backgroundColor: task.category.backgroundColor,
        }}
      >
        {task.category.name}
      </span>
    ),
  },
  { key: 'description', label: 'Description' },
  {
    key: 'createdAt',
    label: 'Created At',
  },
  {
    key: 'assignedUsers',
    label: 'Assigned To',
    render: (task) => (
      <div className='flex items-center -space-x-2'>
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
    ),
  },
];

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

const ListView: React.FC = () => {
  return (
    <div className='flex flex-col space-y-8 w-full my-6 pb-10'>
      <TableV2 columns={columns} data={dummyTasks.todo} tableName='To-Do' />
      <TableV2
        columns={columns}
        data={dummyTasks.inProgress}
        tableName='In Progress'
      />
      <TableV2
        columns={columns}
        data={dummyTasks.inReview}
        tableName='In Review'
      />
      <TableV2 columns={columns} data={dummyTasks.done} tableName='Done' />
    </div>
  );
};

export default ListView;
