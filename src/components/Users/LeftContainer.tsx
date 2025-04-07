import React, { memo } from 'react';
import UsersTable from './UsersTable';

const LeftContainer: React.FC = memo(() => {
  return (
    <div className='w-[75%] bg-white shadow-md rounded-lg border border-gray-200'>
      <UsersTable users={[]} />
    </div>
  );
});

export default LeftContainer;
