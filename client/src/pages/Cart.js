import { useEffect } from 'react';
import { useDispatch , useSelector  } from 'react-redux';
import { useParams, useSearchParams , Link , useNavigate } from 'react-router-dom';
import { addToCart, removeCartItem } from './../actions/cartActions';
import Alert from './../components/alert/Alert';

const Cart = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const [searchParams] = useSearchParams();
   const qty = searchParams.get('qty');
   const { cartItems } = useSelector(state => state.cart);
   const navigate = useNavigate();
 
   const removeFromCart = id => {
      dispatch(removeCartItem(id))
   }
   useEffect(() => {
      dispatch(addToCart(id , qty));
   }, [dispatch , qty , id])

   return (
      <div className='cart__wrapper py-20'>
         <h1 className='font-xl mb-30 font-500'>Cart Items</h1>
         {
            cartItems && cartItems.length > 0 ?
            <div className='cartItem__container flex flex-wrap' >
               <div className='cartItem__left'>
                  {
                     cartItems.map(cart => {
                        return <div className='cartItem   mt-10' key={cart.product}>
                           <ul className='flex items-center justify-between font-sm'>
                              <li style={{width: '100px'}}>
                                 <img style={{width: '100%'}} src={cart.image} alt={cart.name} />
                              </li>
                              <li>
                                 <h3 style={{width: '150px'}}>{cart.name}</h3>
                              </li>
                              <li>
                                 <p>${cart.price}</p>
                              </li>
                              <li>
                                 <select value={cart.qty} onChange={(e) => dispatch(addToCart(cart.product , e.target.value))} >
                                    { 
                                       [...Array(cart.countInStock).keys()].map(stock => (
                                          <option value={stock + 1} key={stock + 1}>{stock+1}</option>
                                       ))
                                    }
                                 </select>
                              </li>
                              <li>
                                 <strong>{cart.qty} * ${cart.price} = ${(cart.qty * cart.price).toFixed(2)}</strong>
                              </li>
                              <li 
                              style={{border: '1px solid var(--light-grey'}} className='py-5 px-20 pointer'
                              onClick={() => removeFromCart(cart.product)}
                              >
                                 <button>
                                    <i className='fas fa-trash'></i>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     })
                  }
               </div> 
               <div className='cartItem__right'>
                  <h3 className='font-lg font-500 text-dark'>
                     Subtotal ({cartItems.reduce((a , c) => a + Number(c.qty) , 0)}) Items
                  </h3>
                  <ul>
                     <li>
                        <strong>Total Price</strong>
                        <span>
                           ${
                              cartItems.reduce((a , c) => (a + Number(c.price * c.qty)) , 0  ).toFixed(2)
                           }
                        </span>
                     </li>
                  </ul>
                  <div className='proceedToCheckout py-10 text-center'>
                     <button 
                     onClick={() => navigate('/order/shipping')}
                     className='btn btn-primary'>
                        Proceed To Checkout
                     </button>
                  </div>
               </div>
            </div>
         
          
            : <Alert> Cart is Empty <Link to='/'>Go For Shopping</Link></Alert>
         }
        
      </div>
   )
}

export default Cart