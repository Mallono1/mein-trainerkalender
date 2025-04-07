import React, { memo } from 'react';
import style from './sidebar.module.css';
// import { BrainCircuit } from 'lucide-react';
import SidebarItems from './SidebarItems';

const Sidebar: React.FC = memo(() => {
  return (
    <div className={style.sidebar}>
      <h3 className={style.sidebar_logo}>
        {/* <BrainCircuit size={30} className='drop_shadow_lg' /> */}
        Tennis App
      </h3>

      <SidebarItems />
    </div>
  );
});

export default Sidebar;
