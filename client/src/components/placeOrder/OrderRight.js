import React from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';


const OrderRight = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { cartItems , shippingInfo , paymentMethod } = useSelector(state => state.cart);
   if(cartItems){
      cartItems.itemsPrice = cartItems.reduce((acc , item ) => acc + (item.price * item.qty)  , 0).toFixed(2);
      cartItems.shippingPrice = (cartItems.itemsPrice > 100 ? 5 : 0).toFixed(2);
      cartItems.taxPrice = (0.10 * cartItems.itemsPrice).toFixed(2);
      cartItems.totalPrice = (Number(cartItems.itemsPrice) + Number(cartItems.taxPrice) + Number(cartItems.shippingPrice)).toFixed(2)
   }
   const orderData = {
      orderItems : cartItems ,
      shippingInfo , 
      paymentMethod ,
      itemsPrice : cartItems.itemsPrice ,
      taxPrice : cartItems.taxPrice,
      shippingPrice : cartItems.shippingPrice,
      totalPrice : cartItems.totalPrice,
   }
   const placeOrderHandler = () => {
      dispatch(createOrder(orderData , navigate))
   }

   return (
      <>
         <ul className='font-sm'>
            <li >
               <h3 className='font-xl text-center font-500 text-dark text-center'>Order Summary</h3>
            </li>
            <li>
               <strong className='font-600'>Items Price</strong>
               <p>${cartItems.itemsPrice}</p>
            </li>
            <li>
               <strong className='font-600'>Shipping Price</strong>
               <p>${cartItems.shippingPrice}</p>
            </li>
            <li>
               <strong className='font-600'>Tax Price</strong>
               <p>${cartItems.taxPrice}</p>
            </li>
            <li>
               <strong className='font-600'>Total Price</strong>
               <p>${cartItems.totalPrice}</p>
            </li>
         </ul>
         <div className='p-10 text-center'>
            <button onClick={placeOrderHandler} className='btn btn-primary'>PLACE ORDER</button>
         </div>
      </>
   )
}

export default OrderRight