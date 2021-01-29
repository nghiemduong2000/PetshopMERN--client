import Axios from 'axios';
import { clearErrors, returnErrors } from './errorActions';
import { loadSession } from './sessionActions';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_USER,
  USER_LOADED,
  USER_LOADING,
} from './types';

// check token & load user
export const loadUser = () => async (dispatch, getState) => {
  try {
    // User loading
    dispatch({
      type: USER_LOADING,
    });

    const user = await Axios.get('/api/auth/user', tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: user.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

// Login
export const login = ({ userEmail, userPassword }) => async (dispatch) => {
  try {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Request body
    const body = JSON.stringify({ userEmail, userPassword });

    const dataUser = await Axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: dataUser.data,
    });
    dispatch(loadSession());
    dispatch(clearErrors());
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
    );
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Register
export const register = (dataRegister) => async (dispatch) => {
  try {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Request body
    const body = JSON.stringify(dataRegister);

    const dataUser = await Axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: dataUser.data,
    });
    dispatch(loadSession());
    dispatch(clearErrors());
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const updateUser = ({ dataUser }) => async (dispatch, getState) => {
  const update = await Axios.patch(
    `/api/users/${getState().auth.user._id}`,
    dataUser
  );
  dispatch({
    type: UPDATE_USER,
    payload: update.data,
  });
};

export const addToCartUser = ({ productId, quantity }) => async (
  dispatch,
  getState
) => {
  const data = {
    userId: getState().auth.user._id,
    quantity,
  };

  const update = await Axios.patch(`/api/users/cart/add/${productId}`, data);

  dispatch({
    type: UPDATE_USER,
    payload: update.data,
  });
};

export const buyAgain = (orderId) => async (dispatch, getState) => {
  const data = {
    userId: getState().auth.user._id,
    orderId,
  };

  const update = await Axios.patch('/api/users/cart/buyAgain', data);

  dispatch({
    type: UPDATE_USER,
    payload: update.data,
  });
};

export const changePassword = (oldPassword, newPassword) => async (
  dispatch,
  getState
) => {
  try {
    const data = {
      oldPassword,
      newPassword,
    };
    await Axios.patch(`/api/users/changePw/${getState().auth.user._id}`, data);

    dispatch(clearErrors());
    dispatch(logout());
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'CHANGEPW_FAIL')
    );
  }
};
