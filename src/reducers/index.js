import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productReducer from './productReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  product: productReducer,
  auth: authReducer,
  error: errorReducer,
  session: sessionReducer,
});
