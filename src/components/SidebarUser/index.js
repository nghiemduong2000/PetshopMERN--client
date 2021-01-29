import { faListAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import './style.scss';

const SidebarUser = (props) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='sidebarUser'>
      <div className='sidebarUser__brief'>
        <img src={user.imageUser} alt='' />
        <span>{user.userName}</span>
      </div>
      <ul className='sidebarUser__list'>
        <li className='sidebarUser__item'>
          <Link to='/user/account/profile'>
            <FontAwesomeIcon icon={faUserCircle} />
            Tài Khoản Của Tôi
          </Link>
          <Collapse
            isOpen={
              props.rest.location.pathname !== '/user/purchase' ? true : false
            }
          >
            <Link
              to='/user/account/profile'
              className={`${
                props.rest.location.pathname === '/user/account/profile'
                  ? 'active'
                  : ''
              }`}
            >
              Hồ sơ
            </Link>
            <Link
              to='/user/account/password'
              className={`${
                props.rest.location.pathname === '/user/account/password'
                  ? 'active'
                  : ''
              }`}
            >
              Đổi mật khẩu
            </Link>
          </Collapse>
        </li>
        <li className={`sidebarUser__item`}>
          <Link
            to='/user/purchase'
            className={`${
              props.rest.location.pathname === '/user/purchase' ? 'active' : ''
            }`}
          >
            <FontAwesomeIcon icon={faListAlt} />
            Đơn Mua
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarUser;
