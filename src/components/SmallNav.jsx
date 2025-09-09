import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/SmallNav.css';

const SmallNav = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const isActive = (path) => {
    return window.location.pathname === path && activeTab === '';
  };

  return (
    <nav className='small-nav'>
      <NavLink
        className={`nav-links ${isActive('/') ? 'active' : ''}`}
        to='/'
        onClick={() => handleClick('home')}
      >
        Home
      </NavLink>
      <NavLink
        className={`nav-links ${isActive('/exercises') ? 'active' : ''}`}
        to='/exercises'
        onClick={() => handleClick('exercises')}
      >
        Exercises
      </NavLink>
      <NavLink
        className={`nav-links ${isActive('/planner') ? 'active' : ''}`}
        to='/planner'
        onClick={() => handleClick('planner')}
      >
        Planner
      </NavLink>
    </nav>
  );
};

export default SmallNav;
