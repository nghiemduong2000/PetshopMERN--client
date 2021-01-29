import RatingStar from 'components/RatingStar';
import React from 'react';
import './style.scss';

const ProductReview = (props) => {
  return (
    <div className='productReview'>
      <img src={props.review.user.imageUser} alt='avatar' />
      <div className='productReview__info'>
        <span>{props.review.user.userName}</span>
        <RatingStar ratingPercent={props.review.rating * 20} />
        <p>{props.review.comment}</p>
      </div>
    </div>
  );
};

export default ProductReview;
