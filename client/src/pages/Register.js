import { useState} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Alert from './../components/alert/Alert';
import Loader from './../components/loader/Loader'

const Register = () => {
   const { error , loading } = useSelector(state => state.register)
   const [name , setName ] = useState('');
   const [email , setEmail ] = useState('');
   const [password , setPassword ] = useState('');
   const [passwordConfirm , setPasswordConfirm ] = useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const registerSubmitHanlder = (e) => {
      e.preventDefault();
      if(password !== passwordConfirm){
         return alert('password does not match.') 
      }
      dispatch(registerUser({ name , email , password }, navigate))
   }

   return (
      <div className='login__container w-70 m-auto py-30'>
         <h1 className='font-xl font-500 text-dark '>SIGN UP</h1>
         {error && <Alert variant='danger'>{error}</Alert>}
         {loading && <Loader />}
         <div className=' mt-20'>
            <form onSubmit={registerSubmitHanlder}>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Name</label>
                  <input type='text' required
                  className='w-100 p-10 font-base mt-5'
                  value={name} 
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Email</label>
                  <input type='email' required
                  className='w-100 p-10 font-base mt-5'
                  value={email} 
                  placeholder="Email Adress"
                  onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Password</label>
                  <input type='password' required
                  className='w-100 p-10 font-base mt-5'
                  placeholder="Your Password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Confirm Password</label>
                  <input type='password' required
                  className='w-100 p-10 font-base mt-5'
                  placeholder="Re-enter your Password"
                  value={passwordConfirm} 
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
               </div>
               <div className='login__submitBtn mt-20'>
                  <button className='btn btn-primary' type='submit'>REGISTER</button>
               </div>
            </form>
            <div className='mt-15 font-sm'>
               <p>Already have an account? <Link to='/login' className='text-dark text-underline'>Login</Link></p>
            </div>
         </div>
      </div>
   )
}

export default Register;