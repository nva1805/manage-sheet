import { ICustomerList } from '../../../interface/interface';
import { ECustomerTypeAction } from './constants';
import { ICustomerErrorAction, ICustomerLoadAction, ISendCustomerListAction, IUpdateCustomerListAction } from './interface';

export const sendCustomerListAction = (payload: ICustomerList[]): ISendCustomerListAction => {
  return {
    type: ECustomerTypeAction.CUSTOMER_LIST,
    payload
  };
};

export const updateCustomerListAction = (payload: ICustomerList): IUpdateCustomerListAction => {
  return {
    type: ECustomerTypeAction.CUSTOMER_ITEM,
    payload
  };
};

export const customerLoadAction = (state: boolean): ICustomerLoadAction => {
  return {
    type: ECustomerTypeAction.LOADING,
    payload: state
  };
};

export const customerErrorAction = (payload: { errorState: boolean, errorMessage: string }): ICustomerErrorAction => {
  return {
    type: ECustomerTypeAction.ERROR,
    payload: {
      errorState: payload.errorState,
      errorMessage: payload.errorMessage
    }
  };
};
