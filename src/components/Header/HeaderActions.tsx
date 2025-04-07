import React, { useCallback } from 'react';
import { BadgeHelp, Bell, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import IconWithPopup from './IconWithPopup';
import HeaderNotification from './HeaderNotifications';
import HeaderMessage from './HeaderMessages';
import UserProfile from './UserProfile';

interface HeaderActionsProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  notificationCount: number;
  messageCount: number;
  popupType: string;
  handlePopupToggle: (type: string) => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  darkMode,
  toggleDarkMode,
  notificationCount,
  messageCount,
  popupType,
  handlePopupToggle,
}) => {
  const handleNotificationClick = useCallback(
    () => handlePopupToggle('notifications'),
    [handlePopupToggle],
  );
  const handleMessageClick = useCallback(
    () => handlePopupToggle('messages'),
    [handlePopupToggle],
  );

  return (
    <div className='flex items-center gap-10'>
      <div className='flex items-center gap-5 text-slate-600'>
        <ThemeToggle darkMode={darkMode} setDarkMode={toggleDarkMode} />
        {/* <BadgeHelp size={20} className='cursor-pointer' /> */}

        {/* <IconWithPopup
          title='Notifications'
          icon={Bell}
          count={notificationCount}
          onClick={handleNotificationClick}
          isOpen={popupType === 'notifications'}
        >
          <HeaderNotification />
        </IconWithPopup>
        <IconWithPopup
          title='Messages'
          icon={Mail}
          count={messageCount}
          onClick={handleMessageClick}
          isOpen={popupType === 'messages'}
        >
          <HeaderMessage />
        </IconWithPopup> */}
      </div>
      <UserProfile />
    </div>
  );
};

export default React.memo(HeaderActions);
