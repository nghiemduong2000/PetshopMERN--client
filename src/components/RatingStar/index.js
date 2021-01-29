import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

const RatingStar = (props) => {
  return (
    <div className='ratingStar'>
      <div
        className={`ratingStar-wrapper ${props.className}`}
        onClick={() => props.handleChangeVote(1)}
      >
        <div
          className='ratingStar--orange'
          style={{
            width:
              props.ratingPercent >= 20
                ? '100%'
                : `${(props.ratingPercent / 20) * 100}%`,
          }}
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
        <FontAwesomeIcon icon={faStar} className='ratingStar--gray' />
      </div>
      <div
        className={`ratingStar-wrapper ${props.className}`}
        onClick={() => props.handleChangeVote(2)}
      >
        <div
          className='ratingStar--orange'
          style={{
            width:
              props.ratingPercent >= 40
                ? '100%'
                : props.ratingPercent <= 20
                ? '0%'
                : `${((props.ratingPercent - 20) / 20) * 100}%`,
          }}
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
        <FontAwesomeIcon icon={faStar} className='ratingStar--gray' />
      </div>
      <div
        className={`ratingStar-wrapper ${props.className}`}
        onClick={() => props.handleChangeVote(3)}
      >
        <div
          className='ratingStar--orange'
          style={{
            width:
              props.ratingPercent >= 60
                ? '100%'
                : props.ratingPercent <= 40
                ? '0%'
                : `${((props.ratingPercent - 40) / 20) * 100}%`,
          }}
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
        <FontAwesomeIcon icon={faStar} className='ratingStar--gray' />
      </div>
      <div
        className={`ratingStar-wrapper ${props.className}`}
        onClick={() => props.handleChangeVote(4)}
      >
        <div
          className='ratingStar--orange'
          style={{
            width:
              props.ratingPercent >= 80
                ? '100%'
                : props.ratingPercent <= 60
                ? '0%'
                : `${((props.ratingPercent - 60) / 20) * 100}%`,
          }}
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
        <FontAwesomeIcon icon={faStar} className='ratingStar--gray' />
      </div>
      <div
        className={`ratingStar-wrapper ${props.className}`}
        onClick={() => props.handleChangeVote(5)}
      >
        <div
          className='ratingStar--orange'
          style={{
            width:
              props.ratingPercent === 100
                ? '100%'
                : props.ratingPercent <= 80
                ? '0%'
                : `${((props.ratingPercent - 80) / 20) * 100}%`,
          }}
        >
          <FontAwesomeIcon icon={faStar} />
        </div>
        <FontAwesomeIcon icon={faStar} className='ratingStar--gray' />
      </div>
    </div>
  );
};

RatingStar.propTypes = {
  handleChangeVote: PropTypes.func,
  className: PropTypes.string,
  ratingPercent: PropTypes.number.isRequired,
};

RatingStar.defaultProps = {
  handleChangeVote: () => {},
  className: '',
};

export default RatingStar;
