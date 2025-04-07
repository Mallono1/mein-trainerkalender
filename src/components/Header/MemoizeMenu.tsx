import React from 'react';
import { Menu } from 'lucide-react';

const MemoizedMenu = React.memo(() => <Menu className='cursor-pointer' />);

export default MemoizedMenu;
