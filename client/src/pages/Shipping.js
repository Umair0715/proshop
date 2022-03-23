import { useState , useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { addShippingInfo } from './../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


const Shipping = () => {
   const { shippingInfo } = useSelector(state => state.cart)
   const [address , setAddress ] = useState('');
   const [city , setCity ] = useState('');
   const [postalCode , setPostalCode ] = useState('');
   const [country , setCountry ] = useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const shippingSubmitHanlder = (e) => {
      e.preventDefault();
      dispatch(addShippingInfo({postalCode , address , city , country}, navigate))
   }

   useEffect(() => {
      if(shippingInfo){
         setAddress(shippingInfo.address)
         setCity(shippingInfo.city)
         setCountry(shippingInfo.country)
         setPostalCode(shippingInfo.postalCode)
      }
   },[dispatch , shippingInfo])

   return (
      <div className='login__container w-50 m-auto py-30'>
         <CheckoutSteps step1 step2/>
         <h1 className='font-xl font-500 text-dark '>SHIPPING INFO</h1>
         <div className=' mt-20'>
            <form onSubmit={shippingSubmitHanlder}>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Adress</label>
                  <input type='text' required
                  className='w-100 p-10 font-base mt-5'
                  value={address} 
                  placeholder="Enter Your Address"
                  onChange={(e) => setAddress(e.target.value)}
                  />
               </div>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>City</label>
                  <input type='text' required
                  className='w-100 p-10 font-base mt-5'
                  value={city}
                  placeholder="Enter Your City"
                  onChange={(e) => setCity(e.target.value)}
                  />
               </div>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Postal Code</label>
                  <input type='text' required
                  className='w-100 p-10 font-base mt-5'
                  placeholder="Enter Postal Code"
                  value={postalCode} 
                  onChange={(e) => setPostalCode(e.target.value)}
                  />
               </div>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Country</label>
                  <input type='text' required
                  className='w-100 p-10 font-base mt-5'
                  placeholder="Enter Your Country"
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)}
                  />
               </div>
               <div className='login__submitBtn mt-20'>
                  <button className='btn btn-primary' type='submit'>
                     CONTINUE
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default Shipping;