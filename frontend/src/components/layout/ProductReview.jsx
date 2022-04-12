import React from 'react'
import StarRatings from 'react-star-ratings'
import moment from 'moment'

const ProductReview = ({reviewDetails}) => {
    const {name,rating,comment,createdAt}=reviewDetails
  return (
    <div className='review-item'>
        <div className='review-head'>
            <div className='review-user-info'>
                <img src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff" alt="profile" className='img-fluid review-user-photo'/>
                <span className='review-user-name'>{name}</span>
            </div>
            <div className='review-date'>
                Posted on: {moment(createdAt).format('MMM Do YYYY')}
            </div>
        </div>
        <StarRatings rating={rating} numberOfStars={5} starDimension='20px' starRatedColor='rgb(251, 183, 44)'/>
        <p className='review-comment'>{comment}</p>
    </div>
  )
}

export default ProductReview