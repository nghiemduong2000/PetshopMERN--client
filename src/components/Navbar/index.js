import { faFrown } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronDown,
  faChevronRight,
  faExchangeAlt,
  faSearch,
  faShippingFast,
  faShoppingCart,
  faThumbsUp,
  faUser,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from 'actions/authActions';
import React, { createRef, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import { dataNavbar } from './data';
import './stye.scss';

const Navbar = (props) => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.session);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const [state, setState] = useState({
    selected: 'Tất cả',
    user: {},
    cart: [],
    inputSearch: '',
  });

  useEffect(() => {
    setState((newState) => ({
      ...newState,
      cart: isAuthenticated
        ? user.cart
        : !session
        ? []
        : session.length === 0
        ? []
        : session.cart,
    }));
    //eslint-disable-next-line
  }, [session, user]);

  const selectElement = createRef();
  const handleChangeSelect = (e) => {
    const value = e.target.value;
    setState((newState) => ({
      ...newState,
      selected: value,
    }));
  };

  const DirectLogin = (
    <Link
      to={{
        pathname: '/login',
        state: {
          ...props.location,
        },
      }}
      className='navbar__login'
    >
      <div className='navbar__login-icon'>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className='navbar__login-title'>Sign In</div>
    </Link>
  );

  useEffect(() => {
    setState((newState) => ({
      ...newState,
      user: user,
    }));
    //eslint-disable-next-line
  }, [user]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    history.push({
      pathname: '/search',
      search: `?s=${state.inputSearch}`,
      state: { detail: 'some_value' },
    });
    setState((newState) => ({
      ...newState,
      inputSearch: '',
    }));
  };

  return (
    <div className='navbar'>
      <div className='navbar__top'>
        <Container>
          <div className='navbar__top-left'>
            <div className='navbar__logo'>
              <Link to='/' className='navbar__logo-link'>
                <img
                  src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1606378313/Petshop%20Project/base/Logo-01_pgk5so.png'
                  alt='logo'
                />
              </Link>
            </div>
            <div className='navbar__searchbar'>
              <form
                className='navbar__searchbar-form'
                onSubmit={handleSubmitSearch}
              >
                <div className='navbar__searchbar-select-wrap'>
                  <span className='navbar__searchbar-label'>
                    <strong>{state.selected}</strong>
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className='navbar__searchbar-select-icon'
                  />
                  <select
                    name='fs'
                    className='navbar__searchbar-select'
                    onChange={handleChangeSelect}
                    ref={selectElement}
                  >
                    <option value='Tất cả'>Tất cả</option>
                    <option value='Thức ăn'>Thức ăn</option>
                    <option value='Quần áo'>Quần áo</option>
                    <option value='Đồ chơi'>Đồ chơi</option>
                  </select>
                </div>
                <input
                  name='s'
                  type='text'
                  className='navbar__searchbar-input'
                  placeholder='Tìm kiếm: Thức ăn,...'
                  maxLength='128'
                  value={state.inputSearch}
                  onChange={(e) =>
                    setState((newState) => ({
                      ...newState,
                      inputSearch: e.target.value,
                    }))
                  }
                />
                <button className='btn navbar__searchbar-btn' type='submit'>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
          </div>
          <div className='navbar__top-right'>
            {isAuthenticated ? (
              <div className='navbar__user-wrap'>
                <Link to='/user/purchase' className='navbar__user'>
                  <img src={user.imageUser} alt='avatar' />
                  <h4>{user.userName}</h4>
                </Link>
                <ul className='navbar__user-dropdown'>
                  <li className='navbar__user-dropdown-item'>
                    <Link
                      to='/user/account/profile'
                      className='navbar__user-dropdown-link'
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className='navbar__user-dropdown-icon'
                      />
                      <span>Tài khoản của tôi</span>
                    </Link>
                  </li>
                  <li className='navbar__user-dropdown-item'>
                    <Link
                      to='/user/purchase'
                      className='navbar__user-dropdown-link'
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className='navbar__user-dropdown-icon'
                      />
                      <span>Đơn mua</span>
                    </Link>
                  </li>
                  <li
                    className='navbar__user-dropdown-item'
                    onClick={() => {
                      dispatch(logout());
                      history.push('/');
                    }}
                  >
                    <span className='navbar__user-dropdown-link'>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className='navbar__user-dropdown-icon'
                      />
                      <span>Đăng xuất</span>
                    </span>
                  </li>
                </ul>
              </div>
            ) : null}
            {!isAuthenticated ? DirectLogin : null}
            <div className='navbar__cart'>
              <Link to='/cart' className='navbar__cart-link'>
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>{state.cart.length}</span>
              </Link>
              <div className='navbar__cart-list-wrapper'>
                {state.cart.length === 0 ? (
                  <Fragment>
                    <FontAwesomeIcon
                      icon={faFrown}
                      className='navbar__cart-empty-icon'
                    />
                    <span className='navbar__cart-empty-text'>
                      Chưa Có Sản Phẩm
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h4 className='navbar__cart-list-wrapper-title'>
                      Sản phẩm mới thêm
                    </h4>
                    <ul className='navbar__cart-list'>
                      {state.cart.map((product, index) => (
                        <li key={index} className='navbar__cart-item'>
                          <Link to={`/${product.productId}`}>
                            <img src={product.imageProduct} alt='' />
                            <div className='navbar__cart-item-info'>
                              <div className='navbar__cart-item-name'>
                                {product.name}
                              </div>
                              <div className='navbar__cart-item-price'>
                                <span>{`${product.price.toLocaleString(
                                  'vi-VN',
                                  {
                                    style: 'currency',
                                    currency: 'VND',
                                  }
                                )}`}</span>{' '}
                                <span>{`x ${product.quantity}`}</span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className='navbar__cart-btnDetail'>
                      <Link to='/cart' className='btn btn--primary'>
                        Xem giỏ hàng
                      </Link>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className='navbar__menu'>
        <Container>
          <ul className='navbar__menu-list'>
            {dataNavbar.map((main, index) => {
              return (
                <li key={index} className='navbar__menu-item'>
                  <Link to={main.url} className='navbar__menu-link'>
                    {main.mainTitle}
                    {main.child ? (
                      <FontAwesomeIcon icon={faChevronDown} />
                    ) : null}
                  </Link>
                  {main.child ? (
                    <ul className='navbar__menu-child'>
                      {main.child.map((child, index) => {
                        return (
                          <li key={index} className='navbar__menu-child-item'>
                            <Link
                              to={child.url}
                              className='navbar__menu-child-item__link'
                            >
                              <FontAwesomeIcon icon={faChevronRight} />
                              <span>{child.childTitle}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
      <div className='navbar__benefits-wrap'>
        <Container className='navbar__benefits'>
          <div className='navbar__benefits-item'>
            <FontAwesomeIcon icon={faWallet} />
            <span>Thanh toán thuận tiện</span>
          </div>
          <div className='navbar__benefits-item'>
            <FontAwesomeIcon icon={faShippingFast} />
            <span>Giao hàng nhanh chóng</span>
          </div>
          <div className='navbar__benefits-item'>
            <FontAwesomeIcon icon={faExchangeAlt} />
            <span>Đổi trả trong 30 ngày</span>
          </div>
          <div className='navbar__benefits-item'>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>Nhiều phản hồi tích cực</span>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
