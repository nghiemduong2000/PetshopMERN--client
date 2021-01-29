import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToCartUser, updateUser } from 'actions/authActions';
import { updateProduct } from 'actions/productActions';
import { addToCartSession } from 'actions/sessionActions';
import RatingStar from 'components/RatingStar';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

const Product = (props) => {
  const refAlter = useRef();
  const dispatch = useDispatch();
  const userBase = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [state, setState] = useState({
    activeLike: false,
    user: {},
    likesUser: [],
  });

  useEffect(() => {
    setState((newState) => ({
      ...newState,
      user: userBase,
      likesUser: userBase ? userBase.likes : [],
    }));
  }, [userBase, isAuthenticated]);

  const { name, price, likes, reviews } = props.product;
  const productId = props.product._id;

  const handleClickLike = () => {
    const dataProduct = new FormData();
    const dataUser = new FormData();
    const indexProductId = state.likesUser.indexOf(productId);
    const newLikesUser = [...state.likesUser];

    if (indexProductId === -1) {
      newLikesUser.push(productId);
      dataUser.append('likes', JSON.stringify(newLikesUser));
      dataProduct.append('likes', likes + 1);
    } else {
      newLikesUser.splice(indexProductId, 1);
      dataUser.append('likes', JSON.stringify(newLikesUser));
      dataProduct.append('likes', likes - 1);
    }

    dispatch(updateProduct({ dataProduct, productId }));
    dispatch(updateUser({ dataUser }));
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      className='product'
      ref={props.refProduct ? props.refProduct : refAlter}
    >
      <div
        className={`product-like ${
          state.likesUser.indexOf(productId) !== -1 ? 'active' : ''
        }`}
        onClick={handleClickLike}
        style={{ display: isAuthenticated || state.user ? 'flex' : 'none' }}
      >
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <Link to={`/${productId}`} className='product-img' onClick={scrollToTop}>
        <img
          src={
            props.product.imageProduct
              ? props.product.imageProduct
              : 'https://res.cloudinary.com/nghiemduong2000/image/upload/v1607401168/Petshop%20Project/base/thuc-an-cho-cho-royal-canin-mini-starter-mother-babydog-3kg-400x400_s73rui.jpg'
          }
          alt='dogFood'
        />
      </Link>
      <RatingStar
        className='product-rating'
        ratingPercent={
          !reviews
            ? 0
            : reviews.length === 0
            ? 0
            : (reviews.reduce((average, review) => average + review.rating, 0) /
                reviews.length /
                5) *
              100
        }
      />
      <Link to={`/${productId}`} className='product-name' onClick={scrollToTop}>
        {name}
      </Link>
      <div className='product-price'>
        {price.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}
      </div>
      <button
        className='btn btn--primary product-btn'
        onClick={() =>
          dispatch(
            isAuthenticated
              ? addToCartUser({ productId, quantity: 1 })
              : addToCartSession({ productId, quantity: 1 })
          )
        }
      >
        Thêm giỏ hàng
      </button>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  refProduct: PropTypes.object,
};

export default Product;
