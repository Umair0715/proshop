import OrderLeft from '../components/placeOrder/OrderLeft';
import OrderRight from '../components/placeOrder/OrderRight';
import CheckoutSteps from './../components/CheckoutSteps';

const PlaceOrder = () => {

   return (
      <div className='w-100 m-auto py-30'>
         <CheckoutSteps step1 step2 step3 step4 width='w-50' />
         <div className='order__container flex flex-wrap '>
            <div className='order__left' style={{width: '70%'}}>
               <OrderLeft />
            </div>
            <div className='order__right' style={{width: '30%'}}>
               <OrderRight />
            </div>
         </div>
      </div>
   )
}

export default PlaceOrder