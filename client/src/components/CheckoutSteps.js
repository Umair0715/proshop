import { Link } from 'react-router-dom'

const CheckoutSteps = ( { step1 , step2 , step3 , step4 , width  } ) => {
   return (
      <div className={`checkoutSteps mb-30 ${width ? width : 'w-100'} m-auto`}>
         <ul className='flex item-center justify-between'>
            <li>
               <Link className={`font-18 font-500 ${step1 ? 'text-dark' : 'text-muted'}`} to='/login'>
                  Login
               </Link>
            </li>
            <li>
               <Link className={`font-18 font-500 ${step2 ? 'text-dark' : 'text-muted'}`} to='/order/shipping'>
                  Shipping
               </Link>
            </li>
            <li>
               <Link className={`font-18 font-500 ${step3 ? 'text-dark' : 'text-muted'}`} to='/order/payment'>
                  Payment
               </Link>
            </li>
            <li>
               <Link className={`font-18 font-500 ${step4 ? 'text-dark' : 'text-muted'}`} to='/order/place'>
                  Place Order
               </Link>
            </li>
         </ul>
      </div>
   )
}

export default CheckoutSteps