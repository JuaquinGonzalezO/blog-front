import React from 'react';
import Sidebar from './navbar/sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}