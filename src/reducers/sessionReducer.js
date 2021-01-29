import { SESSION_LOADED, SESSION_LOADING, UPDATE_SESSION } from 'actions/types';

const initialState = {
  session: [],
  loading: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SESSION_LOADED:
      return {
        ...state,
        session: action.payload,
        loading: false,
      };
    case UPDATE_SESSION:
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
