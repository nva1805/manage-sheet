import { ICustomerList } from '../../interface/interface';
import { ECustomerTypeAction } from '../action/customerAction/constants';
import * as IAC from '../action/customerAction/interface';

export interface ICustomerReducer {
  customerList: ICustomerList[]
  isLoading: boolean
  isError: boolean
  errorMessage: string
}

const INITIAL_STATE = {
  customerList: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

const customerReducer = (state = INITIAL_STATE,
  action: IAC.ISendCustomerListAction
  | IAC.ICustomerErrorAction
  | IAC.IUpdateCustomerListAction
  | IAC.ICustomerLoadAction): ICustomerReducer => {
  switch (action.type) {
    case ECustomerTypeAction.CUSTOMER_LIST:
      return {
        ...state,
        customerList: action.payload,
        isError: false,
        isLoading: false,
        errorMessage: ''
      };
    case ECustomerTypeAction.CUSTOMER_ITEM:
      return {
        ...state,
        customerList: [...state.customerList, action.payload]
      };
    case ECustomerTypeAction.ERROR:
      return {
        ...state,
        isError: action.payload.errorState,
        errorMessage: action.payload.errorMessage
      };
    case ECustomerTypeAction.LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

export default customerReducer;
