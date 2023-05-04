import { AxiosResponse } from 'axios';
import { EAuthTypeAction } from './actionConstants';
import { IAuthLoadAction, ILoginAction } from './interface';

export const LoginSuccessAction = (payload: AxiosResponse): ILoginAction => {
  return {
    type: EAuthTypeAction.LOGIN_SUCCESS,
    payload
  };
};

export const authLoadAction = (state: boolean): IAuthLoadAction => {
  return {
    type: EAuthTypeAction.LOADING,
    payload: state
  };
};

export const LogoutAction = (): { type: string } => {
  return {
    type: EAuthTypeAction.LOGOUT
  };
};
