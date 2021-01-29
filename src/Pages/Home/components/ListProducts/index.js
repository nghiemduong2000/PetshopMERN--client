import BoxProducts from 'components/BoxProducts';
import HeaderBoxProducts from 'components/HeaderBoxProducts';
import Product from 'components/Product';
import { dataHotAndNewAlt, dataPromotionAlt } from 'Pages/Home/data';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import './style.scss';

const ListProducts = (props) => {
  const productsBase = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);

  const [state, setState] = useState({
    dataPromotion: dataPromotionAlt,
    dataHotAndNew: dataHotAndNewAlt,
  });

  useEffect(() => {
    const randomIndex = [];
    for (let i = 0; i <= productsBase.length; i++) {
      const x = Math.floor(Math.random() * productsBase.length);
      if (randomIndex.indexOf(x) === -1) {
        randomIndex.push(x);
      }
    }

    setState((newState) => ({
      ...newState,
      dataPromotion: !loading
        ? [
            {
              title: 'sản phẩm khuyến mại',
              data: productsBase
                .filter((product, index) => product.promotion === true)
                .filter((product, index) => index < 6),
            },
          ]
        : dataPromotionAlt,
      dataHotAndNew: !loading
        ? [
            {
              title: 'bán chạy',
              data: productsBase
                .filter((product, index) => randomIndex.indexOf(index) !== -1)
                .filter((product, index) => index < 6),
            },
            {
              title: 'sản phẩm mới',
              data: productsBase.filter((product, index) => index < 6),
            },
          ]
        : dataHotAndNewAlt,
    }));
    //eslint-disable-next-line
  }, [loading]);

  return (
    <div className='listProducts'>
      <div className='spttc listProducts-item'>
        <HeaderBoxProducts
          dataHeaderBoxProducts={[
            { title: 'sản phẩm theo thú cưng', data: [] },
          ]}
          slider={false}
        />
        <Row className='spttc__items'>
          <Col md='5' className='spttc__items-item'>
            <Link to='/products/cun' className='spttc__items-item-link'>
              <img
                src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1607360757/Petshop%20Project/base/bannerForPet_htlqot.png'
                alt='dog'
              />
            </Link>
          </Col>
          <Col md='5' className='spttc__items-item'>
            <Link to='/products/meo' className='spttc__items-item-link'>
              <img
                src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1607360757/Petshop%20Project/base/bannerForPet2_xsjp6p.png'
                alt='cat'
              />
            </Link>
          </Col>
        </Row>
      </div>
      <BoxProducts dataBoxProducts={state.dataPromotion} component={Product} />
      <BoxProducts dataBoxProducts={state.dataHotAndNew} component={Product} />
    </div>
  );
};

export default ListProducts;
