import Rating from '../Rating';
import './Home.css';
import { Link } from 'react-router-dom';
const Products = ({ product }) => {
   return (
      <div className='product__card text-dark'>
         <div className='product__img'>
            <Link to={`/product/${product._id}`} title='Add to cart'>
               <img src={product.image} alt={product.name} />
            </Link>
         </div>
         <div className='product__info p-5'>
            <div className='product__name'>
               <Link to={`/product/${product._id}`} >
                  <h3 className='font-sm font-600 my-10 text-dark'>{product.name}</h3>
               </Link>
            </div>
            <div className='product__rating flex items-center justify-between font-sm'>
               <Rating value={product.rating} />
               <span >{product.numReviews} (Reviews)</span>
            </div>
            <h2 className='font-lg mt-10'>${product.price}</h2>
         </div>
      </div>
   )
}

export default Products