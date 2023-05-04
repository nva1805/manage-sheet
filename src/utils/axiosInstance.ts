import axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

interface IPersistedState {
  authReducer: string
  _persist: string
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getAccessToken = (): string => {
  const persistedRoot = localStorage.getItem('persist:root');
  const persistedState: IPersistedState = (persistedRoot != null) ? JSON.parse(persistedRoot) : null;
  const authData = (persistedState?.authReducer != null)
    ? JSON.parse(persistedState.authReducer)
    : { account: { accessToken: '', userId: null }, isAuthenticated: false };
  const accessToken: string = authData.account.accessToken;
  return accessToken;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = getAccessToken();
    console.log(accessToken);
    if (accessToken !== '') {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async error => await Promise.reject(error)
);

const handleResponseError = async (error: any): Promise<void> => {
  const statusCode = error.response.status;
  let errorMessage;

  if (statusCode === 401) {
    errorMessage = isAxiosError(error)
      ? error?.response?.data?.error?.details
      : 'Unauthorized access. Please login again.';
  } else if (statusCode === 500) {
    errorMessage = isAxiosError(error)
      ? error?.response?.data?.error?.details
      : 'Server error. Please try again later.';
    await Promise.reject(error);
  }
  if (errorMessage.length > 0) {
    toast.error(errorMessage);
  }
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    return await handleResponseError(error);
  }
);

const logout = (): void => {
  axiosInstance.defaults.headers.common.Authorization = '';
  localStorage.removeItem('persist:root');
};

export { axiosInstance, logout };
