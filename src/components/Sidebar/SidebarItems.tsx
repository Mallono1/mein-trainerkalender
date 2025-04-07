import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItems } from '../../constants';
import style from './sidebar.module.css';
import { useAuth } from '../../context/useAuth';

const SidebarItems: React.FC = React.memo(() => {
  const { logout } = useAuth();

  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  const renderedNavItems = useMemo(() => {
    const renderSection = (
      items: typeof NavItems.pages,
      sectionTitle?: string,
    ) => (
      <div key={sectionTitle} className="mb-4 h-fit">
        {sectionTitle && (
          <h3 className="text-white text-xs capitalize px-2">{sectionTitle}</h3>
        )}
        {items.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const isLogout = item.title === 'Logout';

          if (isLogout) {
            return (
              <button
                key={item.key}
                onClick={logout}
                className={`${style.sidebar_item} text-red-500 hover:bg-red-100 dark:hover:bg-red-900`}
              >
                <item.icon size={23} className="text-red-500" />
                <span className="text-red-500">Logout</span>
              </button>
            );
          }

          return (
            <Link
              to={item.path}
              key={item.key}
              className={`${style.sidebar_item} ${
                isActive ? style.sidebar_item_active : ''
              }`}
            >
              <item.icon size={23} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    );

    return (
      <>
        {renderSection(NavItems.pages, 'Pages')}
        {renderSection(NavItems.others, 'Others')}
      </>
    );
  }, [pathname, logout]);

  return (
    <div className='mt-5 px-2 flex flex-col justify-between h-full'>
      {renderedNavItems}
    </div>
  );
});

export default SidebarItems;
