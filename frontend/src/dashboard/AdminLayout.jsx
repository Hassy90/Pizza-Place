

import AdminPage from './adminPage';
import { Outlet } from 'react-router';

function AdminLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <AdminPage />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
