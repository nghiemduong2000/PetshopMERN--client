import Axios from 'axios';
import { SESSION_LOADED, SESSION_LOADING } from './types';

export const loadSession = () => async (dispatch) => {
  try {
    dispatch({
      type: SESSION_LOADING,
    });

    const session = await Axios.get(`/api/session`);
    dispatch({
      type: SESSION_LOADED,
      payload: session.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addToCartSession = ({ productId, quantity }) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SESSION_LOADING,
    });

    const session = await Axios.patch(`/api/session/add/${productId}`, {
      quantity,
    });
    dispatch({
      type: SESSION_LOADED,
      payload: session.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const resetSession = () => async (dispatch) => {
  try {
    dispatch({
      type: SESSION_LOADING,
    });

    const session = await Axios.get('/api/session/reset');
    dispatch({
      type: SESSION_LOADED,
      payload: session.data,
    });
  } catch (err) {
    console.log(err);
  }
};
