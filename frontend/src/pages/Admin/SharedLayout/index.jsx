import React from 'react';
import { Outlet } from 'react-router-dom';

export function AdminSharedLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
