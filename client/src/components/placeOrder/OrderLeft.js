import React from 'react'
import { useSelector } from 'react-redux';


const OrderLeft = () => {
   const {shippingInfo , paymentMethod , cartItems} = useSelector(state => state.cart);

   return (
      shippingInfo && 
      <>
         <div className='order__shipping'>
            <h3 className='font-xl font-500 text-dark'>SHIPPING</h3>
            <div className='order__shippingInfo font-sm mt-10'>
               <div className='mt-5'>
                  <p><strong className='font-600'>Address : </strong>{shippingInfo.address}</p>
               </div>
               <div className='mt-5'>
                  <p><strong className='font-600'>City : </strong>{shippingInfo.city}</p>
               </div>
               <div className='mt-5'>
                  <p><strong className='font-600'>Country : </strong>{shippingInfo.country}</p>
               </div>
               <div className='mt-5'>
                  <p><strong className='font-600'>Postal Code : </strong>{shippingInfo.postalCode}</p>
               </div>
            </div>
         </div>
         <div className='line my-20'></div>
         <div className='order__paymentMethod'>
            <h3 className='font-lg font-500 text-dark'>PAYMENT</h3>
            <div className='font-sm mt-10'>
               <p><strong className='font-600'>Method : </strong>{paymentMethod}</p>
            </div>
         </div>
         <div className='line my-20'></div>
         <div className='order__Items__container'>
            <h3 className='font-lg font-500 text-dark'>ORDER ITEMS LIST</h3>
            <div className='order__items mt-20'>
               {
                  cartItems && cartItems.map((item , index)  => {
                     return (
                        <ul className='order__item mt-10 flex flex-wrap items-center justify-between font-sm' key={index}>
                           <li>
                              <img style={{width: '70px'}} src={item.image} alt={item.name} />
                           </li>
                           <li>
                              <p>{item.name}</p>
                           </li>
                           <li>
                              <strong>{item.price} * {item.qty} = {item.price * item.qty}</strong>
                           </li>
                        </ul>
                     )
                  })
               }
            </div>
         </div>
      </>
   )
}

export default OrderLeft