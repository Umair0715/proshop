import { useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { getOrderDetails, markDeliver } from '../actions/orderActions';
import Alert from './../components/alert/Alert';
import Loader from './../components/loader/Loader';
import OrderDetailsLeft from '../components/orderDetails/OrderDetailsLeft';


const AdminOrderDetails = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { order , error , loading  } = useSelector(state => state.orderDetails);

   useEffect(() => {
      dispatch(getOrderDetails(id));   
   },[dispatch , id])

   const markDeliveredHandler = () => {
      dispatch(markDeliver(id))
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
                     !order.isDelivered &&
                     <div onClick={markDeliveredHandler} className='p-10 text-center'>
                        <button className='btn btn-primary'>MARK DELIVER</button>
                     </div>
                  }
               </div>
            </div>
         }
      </div>
   )
}

export default AdminOrderDetails;