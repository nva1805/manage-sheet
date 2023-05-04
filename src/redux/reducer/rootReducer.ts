import { combineReducers } from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import customerReducer from './customerReducer';
import generalReducer from './generalReducer';
import memberReducer from './memberReducer';
import taskReducer from './taskReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  // state
  authReducer,
  projectReducer,
  customerReducer,
  generalReducer,
  memberReducer,
  taskReducer,
  notificationReducer
});

export default rootReducer;
