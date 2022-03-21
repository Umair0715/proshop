import "./Profile.css";
import { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import Alert from './../../components/alert/Alert';
import Loader from './../../components/loader/Loader'

const UserProfile = () => {
   const { loading , error , userDetails } = useSelector(state => state.user)
   const [name , setName ] = useState('');
   const [email , setEmail ] = useState('');
   const [password , setPassword ] = useState('');
   const [passwordConfirm , setPasswordConfirm ] = useState('');
   const dispatch = useDispatch();

   const { userInfo : { token } } = useSelector(state => state.login)
   useEffect(() => {
      dispatch(getUserDetails(token))
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
               <h1 className='font-xl font-500 text-dark mb-20'>USER ORDERS</h1>
            </div>
         </div>
      </div>
   )
}

export default UserProfile