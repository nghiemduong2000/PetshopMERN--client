import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

const HeaderBoxProducts = (props) => {
  // Get Node Button Title
  const refTitle = useRef();

  // Create State
  const [state, setState] = useState({
    width: 0,
    activeIndex: 0,
    offsetLeft: 0,
    newPosition: 0,
    dataHeaderBoxProducts: props.dataHeaderBoxProducts,
  });

  useEffect(() => {
    setState((newState) => ({
      ...newState,
      width: refTitle.current.clientWidth,
      offsetLeft: refTitle.current.offsetLeft,
      dataHeaderBoxProducts: props.dataHeaderBoxProducts,
    }));
    //eslint-disable-next-line
  }, [state.activeIndex, props.dataHeaderBoxProducts]);

  // When Click Button Title
  const handleClickTab = (index, data) => {
    setState((newState) => ({
      ...newState,
      activeIndex: index,
    }));
    props.handleChangeTab(data);
  };

  return (
    <div className='headerBoxProducts'>
      {state.dataHeaderBoxProducts.map((data, index) => {
        return (
          <button
            key={index}
            className={`headerBoxProducts__title${
              state.activeIndex === index ? ' active' : ''
            }`}
            ref={state.activeIndex === index ? refTitle : null}
            onClick={() => handleClickTab(index, data)}
          >
            {data.title}
          </button>
        );
      })}
      <div
        className='headerBoxProducts__control'
        style={{ display: props.slider ? 'block' : 'none' }}
      >
        <span className='headerBoxProducts__control-previous'>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={props.slider ? props.handleClickPrevious : null}
          />
        </span>
        <span className='headerBoxProducts__control-next'>
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={props.slider ? props.handleClickNext : null}
          />
        </span>
      </div>
      <span
        style={{
          width: `${state.width}px`,
          transform: `translateX(${state.offsetLeft}px)`,
        }}
        className='headerBoxProducts__underline'
      ></span>
    </div>
  );
};

HeaderBoxProducts.propTypes = {
  dataHeaderBoxProducts: PropTypes.array.isRequired,
  slider: PropTypes.bool,
  handleClickPrevious: PropTypes.func,
  handleClickNext: PropTypes.func,
  handleChangeTab: PropTypes.func,
};

HeaderBoxProducts.defaultProps = {
  slider: false,
  handleClickPrevios: () => {},
  handleClickNext: () => {},
  handleChangeTab: () => {},
};

export default HeaderBoxProducts;
