import {
  // CalendarRange,
  ClipboardList,
  LucideLayoutDashboard,
  UsersRound,
  Settings,
  LogOut,
  LucideIcon,
} from 'lucide-react';

export const NavItems: {
  pages: { key: number; icon: LucideIcon; title: string; path: string }[];
  others: { key: number; icon: LucideIcon; title: string; path: string }[];
} = {
  pages: [
    {
      key: 1,
      icon: LucideLayoutDashboard,
      title: 'Dashboard',
      path: '/dashboard',
    },
    { key: 2, icon: UsersRound, title: 'Students', path: '/students' },
    { key: 4, icon: ClipboardList, title: 'Tasks', path: '/tasks' },
  ],
  others: [
    { key: 6, icon: Settings, title: 'Settings', path: '/settings' },
    { key: 8, icon: LogOut, title: 'Logout', path: '/login' },
  ],
};

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Students from '../pages/Students';
import Tasks from '../pages/Tasks';
import Overview from '../pages/Overview';
import Register from '../pages/Register';
import SettingsPage from '../pages/Settings';
import Logout from '@/pages/Logout';
import ForgotPassword from '@/components/Login/ForgotPassword';
import ResetPassword from '@/components/Login/ResetPassword';

export const publicRoute = [
  {
    key: 1,
    url: '/',
    component: Overview,
  },
  {
    key: 2,
    url: '/login',
    component: Login,
  },
  {
    key: 3,
    url: '/register',
    component: Register,
  },
  {
    key: 4,
    url: '/forgot-password',
    component: ForgotPassword,
  },
  {
    key: 5,
    url: '/reset-password/:token',
    component: ResetPassword,
  },
];

export const protectedRoutes = [
  {
    key: 3,
    url: '/dashboard',
    component: Dashboard,
  },
  {
    key: 4,
    url: '/students',
    component: Students,
  },
  {
    key: 5,
    url: '/tasks',
    component: Tasks,
  },
  {
    key: 6,
    url: '/settings',
    component: SettingsPage,
  },
  {
    key: 8,
    url: '/logout',
    component: Logout,
  },
];
