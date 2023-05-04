import { AxiosResponse } from 'axios';
import { EAuthTypeAction } from './actionConstants';

export interface ILoginAction {
  type: typeof EAuthTypeAction.LOGIN_SUCCESS | EAuthTypeAction.LOGOUT
  payload: AxiosResponse
}

export interface ILogoutAction {
  type: EAuthTypeAction.LOGOUT
}

export interface IAuthLoadAction {
  type: EAuthTypeAction.LOADING
  payload: boolean
}
