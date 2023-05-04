import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ERoute } from '../../../router/routerLink';

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className='text-center mt-40'>
      <span className='text-4xl'>404</span>
      <p>The page you are looking for was not found.</p>
      <button
        onClick={() => navigate(ERoute.HOME)}
        className='bg-green-500 px-1 py-3 font-medium text-white rounded
         hover:bg-white border hover: hover:text-black hover:border-black'
      >
        Back to home
      </button>
    </div>
  );
};

export default NotFound;
