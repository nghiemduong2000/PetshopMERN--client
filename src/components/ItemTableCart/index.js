import { addToCartUser } from 'actions/authActions';
import { addToCartSession } from 'actions/sessionActions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Modal, ModalBody, ModalFooter } from 'reactstrap';

const ItemTableCart = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [state, setState] = useState({
    modal: false,
  });

  const toggle = () => {
    setState((newState) => ({
      ...newState,
      modal: !newState.modal,
    }));
  };

  return (
    <tr>
      <td>
        <Link to={`/${item.productId}`}>
          <img src={item.imageProduct} alt='product' />
          <span>{item.name}</span>
        </Link>
      </td>
      <td>
        {item.price.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}
      </td>
      <td>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (item.quantity > 1) {
                dispatch(
                  isAuthenticated
                    ? addToCartUser({
                        productId: item.productId,
                        quantity: -1,
                      })
                    : addToCartSession({
                        productId: item.productId,
                        quantity: -1,
                      })
                );
              } else {
                toggle();
              }
            }}
            className='cartPage__table-controlQuantity'
          >
            -
          </button>
          <Input
            value={item.quantity}
            className='cartPage__table-inputQuantity'
            readOnly
          />
          <button
            disabled={item.quantity === 10 ? true : false}
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                isAuthenticated
                  ? addToCartUser({
                      productId: item.productId,
                      quantity: 1,
                    })
                  : addToCartSession({
                      productId: item.productId,
                      quantity: 1,
                    })
              );
            }}
            className='cartPage__table-controlQuantity'
          >
            +
          </button>
          <Modal
            isOpen={state.modal}
            centered
            fade={false}
            className='cartPage__table-modal'
          >
            <ModalBody>
              <h4>Bạn có chắc muốn bỏ sản phẩm này?</h4>
              <span>{item.name}</span>
            </ModalBody>
            <ModalFooter>
              <button
                className='btn btn--red'
                onClick={() => {
                  dispatch(
                    isAuthenticated
                      ? addToCartUser({
                          productId: item.productId,
                          quantity: 0,
                        })
                      : addToCartSession({
                          productId: item.productId,
                          quantity: 0,
                        })
                  );
                  toggle();
                }}
              >
                Có
              </button>
              <button className='btn btn--primary' onClick={toggle}>
                Không
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </td>
      <td>
        {(item.price * item.quantity).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}
      </td>
    </tr>
  );
};

ItemTableCart.propTypes = {};

export default ItemTableCart;
