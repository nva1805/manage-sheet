import { ICustomerList } from '../../../interface/interface';
import { ECustomerTypeAction } from './constants';

// customer
export interface ISendCustomerListAction {
  type: ECustomerTypeAction.CUSTOMER_LIST
  payload: ICustomerList[]
}

export interface IUpdateCustomerListAction {
  type: ECustomerTypeAction.CUSTOMER_ITEM
  payload: ICustomerList
}

export interface ICustomerLoadAction {
  type: ECustomerTypeAction.LOADING
  payload: boolean
}

export interface ICustomerErrorAction {
  type: ECustomerTypeAction.ERROR
  payload: {
    errorState: boolean
    errorMessage: string
  }
}
