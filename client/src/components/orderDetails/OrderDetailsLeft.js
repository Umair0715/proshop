import React from 'react'
import Alert from '../alert/Alert'
import Moment from 'react-moment'

const OrderDetailsLeft = ({ order }) => {
   return (
      <>
         <div className='order__shipping'>
            <h1 className='font-xl mb-30 font-500'>Order {order._id}</h1>
            <h3 className='font-xl font-500 text-dark'>SHIPPING</h3>
            <div className='order__shippingInfo font-sm mt-10'>
               <div className='mt-5'>
                  <p><strong className='font-600'>Address : </strong>{order.shippingInfo.address}</p>
               </div>
               <div className='mt-5'>
                  <p><strong className='font-600'>City : </strong>{order.shippingInfo.city}</p>
               </div>
               <div className='mt-5'>
                  <p><strong className='font-600'>Country : </strong>{order.shippingInfo.country}</p>
               </div>
               <div className='mt-5'>
                  <p><strong className='font-600'>Postal Code : </strong>{order.shippingInfo.postalCode}</p>
               </div>
            </div>
            {
               order.isDelivered ? 
               <Alert variant='info'>Order Delivered at <Moment format='DD/MM/YYYY'>{order.deliveredAt}</Moment>
               </Alert>
               : <Alert variant='danger'>Not Delivered</Alert>
            }
         </div>
         <div className='line my-20'></div>
         <div className='orderDetails__user font-sm mt-10'>
            <h3 className='font-xl font-500 text-dark'>USER</h3>
            <div className='mt-5'>
               <p><strong className='font-600'>Name : </strong>{order.user ? order.user.name : ''}</p>
            </div>
            <div className='mt-5'>
               <p><strong className='font-600'>Email : </strong>{order.user ? order.user.email : ''}</p>
            </div>
         </div>
         <div className='line my-20'></div>
         <div className='order__paymentMethod'>
            <h3 className='font-lg font-500 text-dark'>PAYMENT</h3>
            <div className='font-sm mt-10'>
               <p><strong className='font-600'>Method : </strong>{order.paymentMethod}</p>
            </div>
            {
               order.isPaid ? 
               <Alert variant='info'>Paid at <Moment format='DD/MM/YYYY'>{order.paidAt}</Moment>
               </Alert>
               : <Alert variant='danger'>Not Paid</Alert>
            }
         </div>
         <div className='line my-20'></div>
         <div className='order__Items__container'>
            <h3 className='font-lg font-500 text-dark'>ORDER ITEMS LIST</h3>
            <div className='order__items mt-20'>
               {
                  order.orderItems && order.orderItems.map((item , index)  => {
                     return (
                        <ul className='order__item mt-10 flex flex-wrap items-center justify-between font-sm' key={index}>
                           <li>
                              <img style={{width: '70px'}} src={item.product.image} alt={item.product.name} />
                           </li>
                           <li>
                              <p>{item.product.name}</p>
                           </li>
                           <li>
                              <strong>{item.product.price} * {item.qty} = {item.product.price * item.qty}</strong>
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

export default OrderDetailsLeft