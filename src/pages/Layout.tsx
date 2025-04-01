import React from 'react';
import { Outlet } from 'react-router';

import { Header } from '../components';

const Layout: React.FC = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
