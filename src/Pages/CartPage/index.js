import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderBoxProducts from 'components/HeaderBoxProducts';
import ItemTableCart from 'components/ItemTableCart';
import Navbar from 'components/Navbar';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Container, Table } from 'reactstrap';
import './style.scss';

const CartPage = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const currentSession = useSelector((state) => state.session.session);

  const [state, setState] = useState({
    data: [],
  });

  useEffect(() => {
    setState((newState) => ({
      ...newState,
      data: isAuthenticated
        ? currentUser.cart
        : !currentSession
        ? []
        : currentSession.length === 0
        ? []
        : currentSession.cart,
    }));
    //eslint-disable-next-line
  }, [isAuthenticated, currentSession, currentUser]);

  return (
    <div className='cartPage'>
      <Navbar location={props.location} />
      <Container>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Giỏ hàng</BreadcrumbItem>
        </Breadcrumb>
        <HeaderBoxProducts
          dataHeaderBoxProducts={[{ title: 'Giỏ hàng', data: '' }]}
        />
        {state.data.length === 0 ? (
          <div className='cartPage__empty'>
            <FontAwesomeIcon icon={faFrown} className='cartPage__empty-icon' />
            <span className='cartPage__empty-text'>Chưa Có Sản Phẩm</span>
          </div>
        ) : (
          <Fragment>
            <Table className='cartPage__table'>
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Sản phẩm</th>
                  <th style={{ width: '20%' }}>Đơn giá</th>
                  <th style={{ width: '20%' }}>Số lượng</th>
                  <th style={{ width: '20%' }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item, index) => {
                  return <ItemTableCart item={item} key={index} />;
                })}
              </tbody>
            </Table>
            <div className='cartPage__total'>
              <h4>
                {`Tổng cộng: ${state.data
                  .reduce((total, item) => {
                    return total + item.price * item.quantity;
                  }, 0)
                  .toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}`}
              </h4>
              <div className='cartPage__total-direct'>
                <Link to='/products' className='btn btn--secondary'>
                  Tiếp tục mua hàng
                </Link>
                <Link
                  to={{
                    pathname: '/payment',
                    state: {
                      activePayment: true,
                    },
                  }}
                  className='btn btn-primary'
                >
                  Tiến hành thanh toán
                </Link>
              </div>
            </div>
          </Fragment>
        )}
      </Container>
    </div>
  );
};

CartPage.propTypes = {};

export default CartPage;
