import './ProductDetail.css';
import { useNavigate  } from 'react-router-dom';
import Rating from './../Rating'
import { useState } from 'react';
import Moment from 'react-moment'
import { useDispatch , useSelector } from 'react-redux';
import { createReview } from '../../actions/productAction';
import Alert from '../../components/alert/Alert';

const ProductDetail = ({ product }) => {
   const dispatch = useDispatch();
   const [ qty , setQty] = useState(1);
   const [rating , setRating] = useState(1);
   const [review , setReview ] = useState('');
   const navigate = useNavigate();
   const { userInfo } = useSelector(state => state.login);

   const addToCartHandler = id => {
      navigate(`/cart/${id}?qty=${qty}`)
   }

   const createReviewHandler = (e , id) => {
      e.preventDefault();
      dispatch(createReview(id , {review , rating }))
   }

   return (
      <>
         <div> 
            <button className='btn btn-back' onClick={() => navigate(-1)} >
               Go Back
            </button>
            <div className='productDetail__container flex  flex-wrap py-30'>
               <div className='productDetails__img'>
                  <img src={product.image} alt={product.name} />
               </div>
               <div className='productDetails__info'>
                  <h3 className='text-dark mb-10 font-lg'>{product.name}</h3>
                  <div className='line'></div>
                  <div className='flex items-center justify-between my-10'>
                     <Rating value={product.rating} />
                     <span className='font-sm'>{product.numReviews} (Reviews)</span>
                  </div>
                  <div className='line'></div>
                  <div className='productDetails__price font-sm text-light my-10'>
                     <span>Price: ${product.price}</span>
                  </div>
                  <div className='line'></div>
                  <p className='mt-10 font-sm'>{product.description}</p>
               </div>
               <div className='productDetails__checkout font-sm '>
                  <ul>
                     <li>
                        <strong>Price</strong>
                        <span>${product.price}</span>
                     </li>
                     <li>
                        <strong>Status</strong>
                        <span 
                        style={{color: `${product.countInStock > 0 ? 'green' : 'red'}`}}>
                           {product.countInStock > 0 ? 'in Stock' : 'Out Of Stock'}
                        </span>
                     </li>
                     {
                        product.countInStock > 0 && 
                        <li>
                           <strong>Qty</strong>
                           <select value={qty} onChange={(e) => setQty(e.target.value)} >
                              {
                                 
                                 [...Array(product.countInStock).keys()].map( x => (
                                 <option key={x + 1} value={x+1}>{x+1}</option>
                                 ))
                              }
                           </select>
                        </li>
                     }
                  </ul>
                  <div className='productDetails__checkoutBnt'>
                     <button 
                     disabled={product.countInStock === 0} 
                     className='btn btn-primary'
                     onClick={ () => addToCartHandler(product._id)}
                     >
                        Add To Cart
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className='reviews w-50 py-30'>
            <h3 className='font-xl font-500 text-dark'>Reviews</h3>
            {  
                product.reviews && product.reviews.length === 0 ? 
               <Alert variant='danger'>No Review found yet</Alert>
               :
                  product.reviews &&  product.reviews.map(review => {
                  return <div className='review font-sm mt-20' key={review._id}>
                     <strong className='font-base text-capitalize text-dark'>{review.name}</strong>
                     <div className='flex items-center'>
                     <Rating value={review.rating} className=''/>
                     <p className='ml-20'>
                        <Moment format='DD-MM-YYYY'>
                           {review.createdAt}
                        </Moment>
                     </p>
                     </div>
                     <p className='mt-5'>
                        {review.review}
                     </p>
                     <div className='line my-10 w-50'></div>
                  </div>
               })
            }
            {
               userInfo && 
               <div className='createReview'>
                  <h3 className='font-lg font-500 text-dark mt-10'>
                     CREATE REVIEW
                  </h3>
                  <form className='font-sm mt-20' onSubmit={(e) => createReviewHandler( e , product._id)}>
                     <div className='flex flex-col'>
                        <label className='font-base font-500 text-dark'>Rating</label>
                        <select  className='mt-10' value={rating} onChange={(e) => setRating(e.target.value)}>
                           <option value={1}>1 very poor</option>
                           <option value={2}>2 poor</option>
                           <option value={3}>3 good</option>
                           <option value={4}>4 very good</option>
                           <option value={5}>5 excellent</option>
                        </select>
                     </div>
                     <div className='mt-10 flex flex-col'>
                        <label className='font-base font-500 text-dark'>
                           Comment
                        </label>
                        <textarea className='font-sm mt-10 p-10' value={review}
                        onChange={(e) => setReview(e.target.value)}>
                        </textarea>
                     </div>
                     <div className='mt-20'>
                        <button className='btn btn-primary'>SUBMIT</button>
                     </div>
                     <div className='font-sm mt-10'>
                        <span><strong>NOTE:</strong> You can create one review for one product if you create more than one your previous review will be overwrite.</span>
                     </div>
                  </form>
               </div>
            }
         </div>
      </>
   )
}

export default ProductDetail  