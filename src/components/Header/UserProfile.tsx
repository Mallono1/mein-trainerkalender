import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const UserProfile: React.FC = memo(() => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const userRole = useSelector((state: RootState) => state.user.userRole);
  const userOnlineStatus = useSelector(
    (state: RootState) => state.user.isUserOnline,
  );

  return (
    <div className="flex items-center gap-2 min-h-fit min-w-fit relative">
      <div className="flex flex-col items-end leading-tight text-slate-600">
        <p className="text-sm font-medium">{userName}</p>
        <span className="text-xs font-light">{userRole}</span>
      </div>
      <div className="relative min-w-fit min-h-fit">
        <img
          src="https://avatars.githubusercontent.com/u/67030312?v=4"
          alt="avatar"
          className="w-9 h-9 rounded-full border-2 border-slate-300"
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
            userOnlineStatus ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
      </div>
    </div>
  );
});

export default UserProfile;
