import './ProductDetail.css';
import { useNavigate } from 'react-router-dom';
import Rating from './../Rating'
import { useState } from 'react';


const ProductDetail = ({ product }) => {

   const [ qty , setQty] = useState(1);
   const navigate = useNavigate();

   const addToCartHandler = id => {
      navigate(`/cart/${id}?qty=${qty}`)
   }

   return (
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
   )
}

export default ProductDetail  