import React, { useEffect, useRef, useState, useCallback } from 'react';
import MemoizedMenu from './MemoizeMenu';
import HeaderActions from './HeaderActions';
import SearchBar from './SearchBarInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../slicers/globalSlicer/globalSlicer';
import Sidebar from '../Sidebar/Sidebar';
import { Menu } from 'lucide-react';
import clsx from 'clsx';

const Header: React.FC = React.memo(() => {
  const darkMode = useSelector((state: RootState) => state.global.theme);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>('');

  const notificationCount: number = 3;
  const messageCount: number = 5;

  const searchInputRef = useRef<HTMLInputElement>(null!);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   document.documentElement.classList.toggle('dark', darkMode);
  //   localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  // }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePopupToggle = useCallback((type: string) => {
    setPopupType((prev) => (prev === type ? '' : type));
  }, []);

  return (
    <div
      className={clsx(
        'font-ubuntu fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center px-6 z-10 text-slate-700',
        sidebarOpen && 'left-64',
        !sidebarOpen && 'lg:left-64',
      )}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            className="lg:hidden absolute flex"
          >
            {sidebarOpen && <Sidebar />}
            <Menu className="cursor-pointer" />
          </div>
          <div className="hidden lg:flex">
            <Sidebar />
          </div>
          {/* <SearchBar searchInputRef={searchInputRef} /> */}
        </div>
        <div className={sidebarOpen ? 'hidden' : 'static'}>
          <HeaderActions
            darkMode={darkMode === 'light' ? true : false}
            toggleDarkMode={() => dispatch(toggleTheme())}
            notificationCount={notificationCount}
            messageCount={messageCount}
            popupType={popupType}
            handlePopupToggle={handlePopupToggle}
          />
        </div>
      </div>
    </div>
  );
});

export default Header;
