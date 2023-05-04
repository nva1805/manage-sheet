import React from 'react';
import type { FC } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './features/layout/header/Header';
import Sidebar from './features/layout/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const App: FC = () => (
  <div className="App">
    <Header />
    <div className='flex'>
      <div className='hidden lg:block lg:w-72.5'>
        <Sidebar />
      </div>
      <div className='w-full bg-neutral-200 pt-16'>
        <Outlet />
      </div>
    </div>
  </div>
);

export default App;
