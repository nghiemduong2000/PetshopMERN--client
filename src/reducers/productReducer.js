const { GET_PRODUCTS, UPDATE_PRODUCT } = require('actions/types');

const initialState = {
  products: [],
  loading: true,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case UPDATE_PRODUCT:
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      return {
        ...state,
        products: [
          ...state.products.slice(0, index),
          { ...action.payload },
          ...state.products.slice(index + 1),
        ],
      };
    default:
      return state;
  }
};

export default productReducer;
