import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { addPaymentMethod } from '../actions/cartActions';

const Payment = () => {
   const [payment , setPayment] = useState('paypal');
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { shippingInfo } = useSelector(state => state.cart);
   useEffect( () => {
      if(!shippingInfo){
         navigate('/order/shipping')
      }
   }, [navigate , shippingInfo]);

   const paymentSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(addPaymentMethod(payment , navigate))
   }
   return (
      <>
         <div className='payment__wrapper w-50 m-auto py-30'>
            <CheckoutSteps step1 step2 step3/>
            <form onSubmit={paymentSubmitHandler}>
               <h1>Select Payment Method</h1>
               <div className='payment__el flex items-center'>
                  <input type='radio' id='paypal' name='paymentMethod' value='paypal'
                  required checked onChange={e => setPayment(e.target.value)}></input>
                  <label htmlFor='paypal' value='paypal'>Paypal</label>
               </div>

               <div className='payment__el flex items-center'>
                  <input type='radio' id='stripe' name='paymentMethod' value='stripe'
                  required onChange={e => setPayment(e.target.value)}></input>
                  <label htmlFor='stripe' value='stripe'>Stripe</label>
               </div>
               <div className='payment__btn'>
                  <button type='submit' className='btn btn-primary mt-15'>CONTINUE</button>
               </div>
            </form>
         </div>
      </>
   )
}

export default Payment