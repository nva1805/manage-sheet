import React, { useState, useEffect } from 'react';
import LoginImage from '../../../asset/picture/ncc-login.jpg';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TextField } from '../../../components/TextField/TextField';
import { login } from '../../../service/apiService';
import { IGeneralState } from '../../../interface/interface';
import { AxiosResponse, isAxiosError } from 'axios';
import { ERoute } from '../../../router/routerLink';
import Spin from '../../../components/Spin/Spin';
import { LoginSuccessAction, authLoadAction } from '../../../redux/action/authAction/action';

const Login = (): JSX.Element => {
  const [formData, setFormData] = useState({ userName: '', password: '', isRemember: false });
  const [acceptSubmit, setAcceptSubmit] = useState(false);
  const isLoading: boolean = useSelector((state: IGeneralState) => state.authReducer.isLoading);
  const isAuthenticated: boolean = useSelector((state: IGeneralState) => state.authReducer.isAuthenticated);
  const [formErrors, setFormErrors] = useState({ userName: '', password: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (formData.userName.trim().length > 0 && formData.password.trim().length > 0) {
      setAcceptSubmit(true);
    } else if ((formData.userName.trim().length === 0 ||
    formData.password.trim().length === 0) ||
    (formData.userName === '' && formData.password === '')) {
      setAcceptSubmit(false);
    }
  }, [formData.userName, formData.password]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked } = event.target;

    switch (name) {
      case 'username':
        setFormData({ ...formData, userName: value });
        setFormErrors({ ...formErrors, userName: '' });
        break;
      case 'password':
        setFormData({ ...formData, password: value });
        setFormErrors({ ...formErrors, password: '' });
        break;
      case 'remember':
        setFormData({ ...formData, isRemember: checked });
        break;
      default:
        break;
    }
  };

  const handleLogin = async (): Promise<void> => {
    if (formData.userName.length > 64) {
      setFormErrors({ ...formErrors, userName: 'User name is too long!' });
      return;
    }
    if (formData.password.length < 6) {
      setFormErrors({ ...formErrors, password: 'Password must have at least 6 characters!' });
      return;
    }
    dispatch(authLoadAction(true));
    const dataLogin = {
      userNameOrEmailAddress: formData.userName,
      password: formData.password,
      rememberClient: formData.isRemember
    };
    try {
      const response = await login(dataLogin);
      console.log(response);

      if (response.status === 200) {
        dispatch(authLoadAction(false));
        dispatch(LoginSuccessAction(response as unknown as AxiosResponse));
        toast.success(`welcome back, ${formData.userName}`);
        navigate(ERoute.HOME);
      }
    } catch (error) {
      dispatch(authLoadAction(false));
      const errorMessage = isAxiosError(error)
        ? error.response?.data?.error?.detail
        : 'Something went wrong?';
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ERoute.HOME);
    }
  }, []);

  return (
    <div className='bg-blue-400 w-full h-screen relative'>
      <h6 className='block text-center text-4xl pt-12 text-white bg-blue-400'>TimeSheet App</h6>
      <div className='bg-white absolute h-96 top-1/4 -translate-y-8 left-1/2 -translate-x-1/2 rounded-lg'>
        <div className='flex h-full'>
          <div className='hidden md:block relative overflow-hidden rounded-l-lg'>
            <span className='absolute top-0 left-0 right-0 bottom-0 lg:bg-black lg:bg-opacity-50'></span>
            <img src={LoginImage} alt='ncc asia' className='object-cover w-96 h-full' />
            <p className='hidden lg:block w-1/2 m-auto p-5 text-3xl leading-10 font-bold
             text-center absolute top-10 text-white left-1/2 -translate-x-1/2'>NCC ASIA Timesheet</p>
          </div>
          <div className='m-4 w-80 sm:w-96 '>
            <h6 className='text-center pt-2 mb-16 text-neutral-600 font-medium text-3xl'>Log in</h6>
            <div className='flex items-center justify-start gap-4 relative h-10 mb-12'>
              <FaUserAlt className='w-4 h-4 translate-y-2' />
              <TextField type='text'
                name='username'
                htmlFor='userName'
                labelTitle='User name or email *'
                inputType='input'
                value={formData.userName}
                onChange={handleInputChange} />
              {(formErrors.userName.length > 0) &&
              <p className='absolute -bottom-8 left-7 text-red-700 text-xs'>{formErrors.userName}</p>}
            </div>
            <div className='flex items-center justify-start gap-4 relative h-10 mb-12'>
              <RiLockPasswordFill className='w-4 h-4 translate-y-2' />
              <TextField
                type='password'
                name='password'
                htmlFor='password'
                labelTitle='Password *'
                inputType='input'
                value={formData.password}
                onChange={handleInputChange} />
              {(formErrors.password.length > 0) &&
              <p className='absolute -bottom-8 left-7 md:-bottom-12 lg:-bottom-8 text-red-700 text-xs'
              >
                {formErrors.password}
              </p>}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <input
                  className='w-4 h-4 cursor-pointer'
                  name='remember'
                  type='checkbox'
                  id='remember'
                  checked={formData.isRemember}
                  onChange={handleInputChange} />
                <label className='cursor-pointer' htmlFor='remember'>Remember me</label>
              </div>
              {acceptSubmit
                ? <button
                  className='bg-blue-600 hover:bg-blue-500 text-white py-3 rounded
                   min-w-80px lg:mr-5 lg:min-w-140px'
                  onClick={handleLogin as () => void}
                >
                  Login
                </button>
                : <button
                  className='bg-neutral-300 text-neutral-500 py-3 rounded min-w-80px
                  lg:mr-5 lg:min-w-140px cursor-default'
                >
                  Login
                </button>
              }
            </div>
          </div>
        </div>
      </div>
      <Spin isLoading={isLoading} tip={'Loading'} />
    </div>
  );
};

export default Login;
