import React from 'react';
import SmallNav from '../components/SmallNav';
import { Outlet } from 'react-router-dom';

const NavLayout = () => {
  return (
    <>
      <SmallNav />
      <div className='pages'>
        <Outlet />
      </div>
    </>
  );
};

export default NavLayout;
