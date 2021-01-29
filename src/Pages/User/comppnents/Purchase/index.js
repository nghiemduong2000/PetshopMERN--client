import HeaderBoxProducts from 'components/HeaderBoxProducts';
import React from 'react';
import { useSelector } from 'react-redux';
import Order from './components/Order';
import './style.scss';

const Purchase = (props) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className='purchase'>
      <HeaderBoxProducts
        dataHeaderBoxProducts={[{ title: 'Đơn mua', data: '' }]}
        slider={false}
      />
      <div className='purchase__main'>
        {user.orders.length === 0 ? (
          <span className='purchase__empty'>Chưa có đơn hàng nào</span>
        ) : (
          user.orders.map((order, index) => <Order order={order} key={index} />)
        )}
      </div>
    </div>
  );
};

Purchase.propTypes = {};

export default Purchase;
