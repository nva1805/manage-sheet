import React, { useState } from 'react';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { BiBarChartSquare } from 'react-icons/bi';
import { Menu, MenuProps } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../../../utils/axiosInstance';
import { ERoute } from '../../../router/routerLink';
import { useResetDataSummit } from '../../../hooks/useResetDataSummit';
import { useNavigate } from 'react-router-dom';
import { LogoutAction } from '../../../redux/action/authAction/action';

const Sidebar = (): JSX.Element => {
  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetData = useResetDataSummit();

  const defaultSelectPath = location.pathname.includes(ERoute.PROJECT)
    ? [ERoute.PROJECT]
    : [ERoute.HOME];
  const sidebarItems = [
    {
      key: ERoute.HOME,
      label: 'Home',
      icon: <AiFillHome />
    },
    {
      key: ERoute.PROJECT,
      label: 'Project',
      icon: <BiBarChartSquare />
    }
  ];

  const handleShowLogout = (): void => {
    setShowLogout(!showLogout);
  };
  const handleLogout = (): void => {
    logout();
    dispatch(LogoutAction());
  };
  const handleSideBarClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case ERoute.HOME:
        navigate(ERoute.HOME);
        break;
      case ERoute.PROJECT:
        resetData();
        navigate(ERoute.PROJECT);
        break;
      default:
        break;
    }
  };
  return (
    <div className='mt-16 relative w-72.5 h-container bg-white'>
      <div className="bg-user-info h-24 flex py-3 px-3.5 items-center relative text-white gap-2 flex-1">
        <div className='w-16 h-16'>
          <img
            src="https://dayve.vn/wp-content/uploads/2021/12/cach-ve-mat-troi-buoc-5.png"
            alt=""
            className='h-16 w-16 rounded-full object-cover'
          />
        </div>
        <div className='flex flex-col justify-start'>
          <span className='block w-full'><b>Nguyen Van Anh</b></span>
          <span className='block w-full'>anh.nv@gmail.com</span>
        </div>
        <button
          className='absolute right-2 top-2 text-2xl active:scale-100 transition-all
          duration-200 ease-linear cursor-pointer hover:text-blue-400 hover:rotate-90 hover:scale-150'
          onClick={handleShowLogout}
        >
          <AiFillSetting />
        </button>
        {
          showLogout &&
            <button className='absolute right-0 bottom-0 z-10 bg-green-550 text-white
             hover:bg-white border border-green-550 hover:border-blue-500 hover:text-black
             font-bold py-3 px-4 rounded mt-4 transition-all duration-300'
            onClick={handleLogout}
            >Logout</button>
        }

      </div>
      <div className='bg-white h-sidebar overflow-hidden scrollbar-hidden'>
        <Menu
          items={sidebarItems}
          defaultSelectedKeys={defaultSelectPath}
          defaultOpenKeys={defaultSelectPath}
          onClick={handleSideBarClick}
          className='text-base font-normal'
        />
      </div>
      <div className='absolute text-black bottom-0 text-sm text-center
       w-full pr-4 border-t border-neutral-300'>
        <p>© 2023 <b>Timesheet.</b></p>
        <p><b>Version</b> 1.0.0 <b>By</b> anh.nguyenvan</p>
      </div>
    </div>
  );
};

export default Sidebar;
