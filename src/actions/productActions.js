import Axios from 'axios';
import { GET_PRODUCTS, PRODUCTS_LOADING, UPDATE_PRODUCT } from './types';

export const getProducts = () => async (dispatch) => {
  dispatch(setProductsLoading());
  const products = await Axios.get('/api/products');
  dispatch({
    type: GET_PRODUCTS,
    payload: products.data,
  });
};

export const setProductsLoading = () => {
  return {
    type: PRODUCTS_LOADING,
  };
};

export const updateProduct = ({ dataProduct, productId }) => async (
  dispatch
) => {
  const update = await Axios.patch(`/api/products/${productId}`, dataProduct);
  dispatch({
    type: UPDATE_PRODUCT,
    payload: update.data,
  });
};
