import React from 'react';
import Sidebar from './navbar/sidebar.jsx';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}