import React, { memo } from 'react';
import UserDetails from './UserDetails';

const RightContainer: React.FC = memo(() => {
  return (
    <div className='p-5 w-[25%] bg-white shadow-md h-[90vh] rounded-lg border border-gray-200'>
      <UserDetails selectedUser={null} />
    </div>
  );
});

export default RightContainer;
