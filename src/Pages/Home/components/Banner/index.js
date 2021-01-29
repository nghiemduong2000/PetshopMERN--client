import { faCircle as faCircleRe } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataBanner } from './data';
import './style.scss';

const Banner = (props) => {
  const ref = useRef();
  const debounce = useRef(null);
  const [state, setState] = useState({
    width: 0,
    newIndex: 0,
    activeIndex: 0,
  });

  const actionNext = () => {
    setState((newState) => ({
      ...newState,
      newIndex:
        newState.newIndex === (dataBanner.length - 1) * newState.width
          ? 0
          : newState.newIndex + newState.width,
      activeIndex:
        newState.activeIndex === dataBanner.length - 1
          ? 0
          : newState.activeIndex + 1,
    }));
  };

  useEffect(() => {
    setState({
      ...state,
      width: ref.current.clientWidth,
    });
    debounce.current = setInterval(() => {
      actionNext();
    }, 4000);
    return () => clearInterval(debounce.current);
    //eslint-disable-next-line
  }, []);

  const sliderNext = () => {
    if (debounce.current) {
      clearInterval(debounce.current);
    }

    actionNext();

    debounce.current = setInterval(() => {
      actionNext();
    }, 4000);
  };

  const sliderPrevious = () => {
    if (debounce.current) {
      clearInterval(debounce.current);
    }

    setState((newState) => ({
      ...newState,
      newIndex:
        newState.newIndex === 0
          ? (dataBanner.length - 1) * newState.width
          : newState.newIndex - newState.width,
      activeIndex:
        newState.activeIndex === 0
          ? dataBanner.length - 1
          : newState.activeIndex - 1,
    }));

    debounce.current = setInterval(() => {
      actionNext();
    }, 4000);
  };

  const handleClickActive = (index) => {
    if (debounce.current) {
      clearInterval(debounce.current);
    }

    setState((newState) => ({
      ...newState,
      activeIndex: index,
      newIndex: index * newState.width,
    }));

    debounce.current = setInterval(() => {
      actionNext();
    }, 4000);
  };

  return (
    <Fragment>
      <div className='banner' ref={ref}>
        <div
          className='banner__slider'
          style={{ transform: `translateX(-${state.newIndex}px)` }}
        >
          {dataBanner.map((image, index) => (
            <div key={index} className='banner__slider-item'>
              <img
                style={{ width: `${state.width}px` }}
                src={image}
                alt='banner'
              />
              <Link to='' className='banner__slider-btn'>
                KHÁM PHÁ
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </div>
          ))}
        </div>
        <div className='banner__slider-control'>
          <button
            className='banner__slider-control-previous'
            onClick={sliderPrevious}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className='banner__slider-control-next' onClick={sliderNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <ul className='banner__slider-control-indicators'>
            {dataBanner.map((image, index) => {
              return (
                <li
                  key={index}
                  index={index}
                  className='banner__slider-control-dot'
                  onClick={() => handleClickActive(index)}
                >
                  <FontAwesomeIcon
                    icon={state.activeIndex === index ? faCircle : faCircleRe}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default Banner;
