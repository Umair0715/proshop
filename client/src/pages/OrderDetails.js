import { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import Alert from './../components/alert/Alert';
import Loader from './../components/loader/Loader';
import OrderDetailsLeft from '../components/orderDetails/OrderDetailsLeft';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderDetails = () => {
   const [sdkReady , setSdkReady] = useState(false);
   const { id } = useParams();
   const dispatch = useDispatch();
   const { order , error , loading  } = useSelector(state => state.orderDetails);
   const { success , loading : loadingPay} = useSelector(state => state.pay)

   useEffect(() => {
      const addPaypalScript = async () => {
         const { data : { clientId }} = await axios.get('/api/paypal/config');
         const script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
         script.async = true ;
         script.onload = () => {
            setSdkReady(true);
         }
         document.body.appendChild(script);
      }
      if(!order || success){
         dispatch({ type : ORDER_PAY_RESET })
         dispatch(getOrderDetails(id));   
      }else if (!order.isPaid){
         if(!window.paypal){
            addPaypalScript();
         }else{
            setSdkReady(true);
         }
      }
   },[dispatch , id , order , success])

   const paymentSuccessHanlder = (paymentResult) => {
      console.log(paymentResult)
      dispatch(payOrder(id , paymentResult))
   }

   return (
      <div className='orderDetails'>
         {error && <Alert variant='danger'>{error}</Alert>}
         {loading && <Loader />}
         {
            order && 
            <div className='orderDetails__container py-30 flex'>  
               <div className='orderDetails__left w-70'>
                  <OrderDetailsLeft order={order} />
               </div>
               <div className='orderDetails__right order__right'>
                  <ul className='font-sm'>
                     <li >
                        <h3 className='font-xl text-center font-500 text-dark text-center'>Order Summary</h3>
                     </li>
                     <li>
                        <strong className='font-600'>Items Price</strong>
                        <p>${order.itemsPrice}</p>
                     </li>
                     <li>
                        <strong className='font-600'>Shipping Price</strong>
                        <p>${order.shippingPrice}</p>
                     </li>
                     <li>
                        <strong className='font-600'>Tax Price</strong>
                        <p>${order.taxPrice}</p>
                     </li>
                     <li>
                        <strong className='font-600'>Total Price</strong>
                        <p>${order.totalPrice}</p>
                     </li>
                  </ul>
                  {
                     !order.isPaid &&
                     <div>
                        {loadingPay && <Loader />} 
                        {
                           !sdkReady ? <Loader />
                           :
                           <PayPalButton amount={order.totalPrice} onSuccess={paymentSuccessHanlder} />
                        }
                     </div>
                  }
               </div>
            </div>
         }
      </div>
   )
}

export default OrderDetails