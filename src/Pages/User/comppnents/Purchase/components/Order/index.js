import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buyAgain } from 'actions/authActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const Order = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className='purchase__main-item'>
      <div className='purchase__main-item-header'>
        <span className='purchase__main-item-header-left'>
          <FontAwesomeIcon icon={faShippingFast} />
          {props.order.userAddress}
        </span>
        <span className='purchase__main-item-header-right'>
          Phương thức thanh toán: {props.order.paymentMethod.toUpperCase()}
        </span>
      </div>
      <div className='purchase__main-item-productsList'>
        {props.order.productsList.map((item, index) => (
          <Link
            to={`/${item.productId}`}
            className='purchase__main-item-product'
            key={index}
          >
            <img src={item.imageProduct} alt='' />
            <span className='purchase__main-item-product-info'>
              {item.name}
              <br />x{item.quantity}
            </span>
            <span className='purchase__main-item-product-price'>
              {item.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </Link>
        ))}
      </div>
      <div className='purchase__main-item-footer'>
        <button
          className='purchase__main-item-again btn btn-primary'
          onClick={() => {
            dispatch(buyAgain(props.order._id));
            history.push('/cart');
          }}
        >
          Mua lần nữa
        </button>
        <div className='purchase__main-item-total'>
          <span className='purchase__main-item-total-text'>Tổng số tiền:</span>
          <span className='purchase__main-item-total-price'>
            {props.order.productsList
              .reduce((total, product) => {
                return (total += product.price * product.quantity);
              }, 0)
              .toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
          </span>
        </div>
      </div>
    </div>
  );
};

Order.propTypes = {};

export default Order;
