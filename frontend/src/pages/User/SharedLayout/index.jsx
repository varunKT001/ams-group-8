import React from 'react';
import { Outlet } from 'react-router-dom';

export function UserSharedLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
