import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { MdDensityMedium } from 'react-icons/md';
import NCCLogo from '../../../asset/picture/NCCLogo.png';
import { useNavigate } from 'react-router-dom';
import { ERoute } from '../../../router/routerLink';

const Header = (): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();
  const handleShowSidebar = (): void => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };
  return (
    <div className='bg-green-550 h-16 fixed top-0 left-0 right-0 z-10 text-white'>
      <div className='flex justify-between'>
        <div
          className='flex items-center gap-3 translate-y-2 mx-5 cursor-pointer'
          onClick={() => navigate(ERoute.HOME)}>
          <img className='h-9 rounded p-2 mt-1 bg-white' src={NCCLogo} alt="NCC Logo" />
          <div className='text-xl'>TimeSheet</div>
        </div>
        <div
          className='lg:hidden p-4 absolute top-0 right-0 z-30 text-xl scale-125
         active:scale-50 transition-all duration-300 ease-linear'
          onClick={handleShowSidebar}>
          <MdDensityMedium />
        </div>
        {
          showSidebar &&
          <div className='block lg:hidden relative'>
            <div className='absolute z-20 right-0 animate-slide-in-right'>
              <Sidebar />
            </div>
            <div className='fixed z-0 top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50'
            >
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
