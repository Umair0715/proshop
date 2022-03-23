import "./Profile.css";
import { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import Alert from './../../components/alert/Alert';
import Loader from './../../components/loader/Loader'
import { myOrders } from './../../actions/orderActions';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
   const navigate = useNavigate();
   const { loading , error , userDetails } = useSelector(state => state.user)
   const [name , setName ] = useState('');
   const [email , setEmail ] = useState('');
   const [password , setPassword ] = useState('');
   const [passwordConfirm , setPasswordConfirm ] = useState('');
   const dispatch = useDispatch();
   
   const { userInfo : { token } } = useSelector(state => state.login)
   const { orders , loading : ordersLoading , error : ordersError } = useSelector(state => state.myOrders);
   useEffect(() => {
      dispatch(getUserDetails(token))
      dispatch(myOrders());
   },[dispatch , token])
   
   useEffect(() => {
      if(userDetails){
         setName(userDetails.name ? userDetails.name : '');
         setEmail(userDetails.email ? userDetails.email : '')
      }
   },[userDetails])
   
   const updateProfileHandler = (e) => {
      e.preventDefault();
      if(password.length > 0 ){
         if(password !== passwordConfirm){
            return alert('passwords does not match. please try again.')
         }
      }
      dispatch(updateUserProfile({name , email , password} , token ))
   }
   
   return (
      <div className='login__container w-100 m-auto py-30'>
         {error && <Alert variant='danger'>{error}</Alert>}
         {loading && <Loader />}
         <div className='profile__container flex'>
            <div className='profile__left'>
            <h1 className='font-xl font-500 text-dark mb-20'>USER PROFILE</h1>
               <form onSubmit={updateProfileHandler}>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Name</label>
                     <input type='text' 
                     className='w-100 p-10 font-base mt-5'
                     value={name} 
                     placeholder="Your Name"
                     onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Email</label>
                     <input type='email' 
                     className='w-100 p-10 font-base mt-5'
                     value={email} 
                     placeholder="Email Adress"
                     onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Password</label>
                     <input type='password' 
                     className='w-100 p-10 font-base mt-5'
                     placeholder="Your Password"
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Confirm Password</label>
                     <input type='password' 
                     className='w-100 p-10 font-base mt-5'
                     placeholder="Re-enter your Password"
                     value={passwordConfirm} 
                     onChange={(e) => setPasswordConfirm(e.target.value)}
                     />
                  </div>
                  <div className='login__submitBtn mt-20'>
                     <button className='btn btn-primary' type='submit'>UPDATE</button>
                  </div>
               </form>
            </div>
            <div className='profile__right ml-20'>
               <h1 className='font-xl font-500 text-dark mb-20'>MY ORDERS</h1>
               {
                  ordersLoading ? <Loader />
                  : ordersError ? <Alert variant='danger'>{error}</Alert>
                  : orders && 
                  <table>
                        <thead>
                           <tr>
                              <th scope="col">ID</th>
                              <th scope="col">DATE</th>
                              <th scope="col">TOTAL</th>
                              <th scope="col">PAID</th>
                              <th scope="col">DELIVERED</th>
                              <th scope="col">VIEW</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              orders.map(order => {
                                 return ( 
                                    <tr key={order._id}>
                                    <td data-label="ID" >{order._id}</td>
                                    <td data-label="DATE">
                                       <Moment format='DD-MM-YYYY'>
                                          {order.createdAt}
                                       </Moment>
                                    </td>
                                    <td data-label="TOTAL">
                                       ${order.totalPrice}
                                    </td>
                                    <td data-label="PAID">
                                       {
                                          order.isPaid ? <Moment format='DD-MM-YYYY'>{order.paidAt}</Moment> : <p style={{color: 'red'}}>Not Paid</p>
                                       }
                                    </td>
                                    <td data-label="DELIVERED">
                                       {
                                          order.isDelivered ? <Moment format='DD-MM-YYYY'>{order.deliveredAt}</Moment> : <p style={{color: 'red'}}>Not Deliv..</p>
                                       }
                                    </td>
                                    <td data-label="VIEW">
                                       <button onClick={() => navigate(`/order/${order._id}`)} 
                                       style={{padding: '.5rem 1rem' }}>
                                          View Details 
                                       </button>
                                    </td>
                                 </tr>
                                )
                              })
                           }
                        </tbody>
                     </table>

               }
            </div>
         </div>
      </div>
   )
}

export default UserProfile