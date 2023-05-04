import { EAuthTypeAction } from '../action/authAction/actionConstants';
import { IAuthLoadAction, ILoginAction } from '../action/authAction/interface';

export interface IUserReducer {
  account: {
    accessToken: string
    userId: null | number
  }
  isAuthenticated: boolean
  isLoading: boolean
  errorMessage: string
}
const INITIAL_STATE = {
  account: {
    accessToken: '',
    userId: null
  },
  isAuthenticated: false,
  isLoading: false,
  errorMessage: ''

};

const userReducer = (state = INITIAL_STATE, action: ILoginAction | IAuthLoadAction): IUserReducer => {
  switch (action.type) {
    case EAuthTypeAction.LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          accessToken: action?.payload?.data?.result?.accessToken,
          userId: action?.payload?.data?.result?.userId
        },
        isAuthenticated: true,
        isLoading: false
      };

    case EAuthTypeAction.LOGOUT:
      console.log(action);
      return {
        ...state,
        account: {
          accessToken: '',
          userId: null
        },
        isAuthenticated: false,
        isLoading: false
      };

    case EAuthTypeAction.LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
