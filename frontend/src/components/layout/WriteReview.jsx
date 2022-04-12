import React,{useState} from 'react';
import {FaStar} from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from '../../actions/productListActions';
import Message from './Message';

const WriteReview = () => {
    const { id } = useParams();
    const [review,setReview]=useState({rating:0,comment:""});
    const [hover,setHover]=useState(0);
    const dispatch = useDispatch();
    const reviewState = useSelector((state)=>state.reviewCreate)
    const {loading,error}= reviewState;
    const handleSubmitRating=(e)=>{
        e.preventDefault();
        console.log(review)
        dispatch(createReview(id,review));
        setReview({rating:0,comment:""});
        console.log(review)
    }
  return (
    <>
        {error && <Message type="danger" message={error} />}
        <form onSubmit={handleSubmitRating} className="review-form">
            <h3 className='text-center py-3'>Write a Review</h3>
            <div className='star-box'>
                {[...Array(5).keys()].map((x)=>{
                    const ratingValue = x+1;
                    return (
                        <label className="rate" key={ratingValue}>
                            <input type="radio" name="rating" id="star1" value={ratingValue} onChange={(e)=>{
                                setReview({...review,[e.target.name]:e.target.value});
                            }}/>
                            <FaStar size={35} color={ratingValue <= (hover || review.rating) ? "var(--theme)":"#d6e1f7" } onMouseEnter={()=>setHover(ratingValue)} onMouseLeave = {()=>setHover(0)}/>
                        </label>
                    )
                })}
            </div>
            <div className="comment-box">
                <textarea name="comment" rows="10" value={review.comment} placeholder='Describe your experience' onChange={(e)=>{
                    setReview({...review,[e.target.name]:e.target.value});
                }}></textarea>
            </div>
            <button type="submit" className='btn custom-theme-button'>{loading?"Submitting":"Rate Now!"}</button>
        </form>
    </>
  )
}

export default WriteReview