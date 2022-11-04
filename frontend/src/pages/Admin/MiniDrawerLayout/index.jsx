import React from 'react';
import { Outlet } from 'react-router-dom';
import MiniDrawer from '../../../components/MiniDrawer';

export function MiniDrawerLayout() {
  return (
    <MiniDrawer>
      <Outlet />
    </MiniDrawer>
  );
}
