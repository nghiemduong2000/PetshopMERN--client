import HeaderBoxProducts from 'components/HeaderBoxProducts';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'reactstrap';
import './style.scss';

const BoxProducts = (props) => {
  const Comp = props.component;

  // Get Node Product
  const refProduct = useRef();

  // Create State
  const [state, setState] = useState({
    widthProduct: 0,
    newPosition: 0,
    dataBoxProducts: props.dataBoxProducts[0].data,
  });

  // Get Width Product
  useEffect(() => {
    setState((newState) => ({
      ...newState,
      widthProduct: refProduct.current.getBoundingClientRect().width,
      dataBoxProducts: props.dataBoxProducts[0].data,
    }));
    //eslint-disable-next-line
  }, [props.dataBoxProducts]);

  // Previous Products Slider
  const handleClickPrevious = () => {
    setState((newState) => ({
      ...newState,
      newPosition:
        newState.newPosition === 0
          ? (state.dataBoxProducts.length - 4) * (newState.widthProduct + 30)
          : newState.newPosition - newState.widthProduct - 30,
    }));
  };

  // Next Products Slider
  const handleClickNext = () => {
    setState((newState) => ({
      ...newState,
      newPosition:
        newState.newPosition ===
        (state.dataBoxProducts.length - 4) * (newState.widthProduct + 30)
          ? 0
          : newState.newPosition + newState.widthProduct + 30,
    }));
  };

  const handleChangeTab = (data) => {
    setState((newState) => ({
      ...newState,
      dataBoxProducts: data.data,
      newPosition: 0,
    }));
  };

  return (
    <div className='listProducts-item'>
      <HeaderBoxProducts
        dataHeaderBoxProducts={props.dataBoxProducts}
        slider={true}
        handleClickNext={handleClickNext}
        handleClickPrevious={handleClickPrevious}
        handleChangeTab={handleChangeTab}
      />
      <div className='boxProducts__slider'>
        <Row
          className='boxProducts__slider-content'
          style={{ transform: `translateX(-${state.newPosition}px)` }}
        >
          {state.dataBoxProducts.map((product, index) => {
            return (
              <Col key={index} md='3' className='boxProducts__slide-wrap'>
                <Comp product={product} refProduct={refProduct} />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

BoxProducts.propTypes = {
  dataBoxProducts: PropTypes.array.isRequired,
};

export default BoxProducts;
