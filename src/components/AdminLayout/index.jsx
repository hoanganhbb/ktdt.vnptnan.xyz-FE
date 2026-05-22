import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div
      style={{
        margin: 0,
        height: 'calc(100vh - 60px)',
        overflowY: 'auto'
      }}
    >
      <Outlet />
    </div>
  );
}

AdminLayout.propTypes = {};

export default AdminLayout;
