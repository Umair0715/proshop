import { useState} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { loginUser } from '../actions/userActions';
import Alert from './../components/alert/Alert';
import Loader from './../components/loader/Loader'

const Login = () => {
   const [email , setEmail ] = useState('');
   const [password , setPassword ] = useState('');
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { loading , error  } = useSelector(state => state.login);

   const loginSubmitHanlder = (e) => {
      e.preventDefault();
      dispatch(loginUser({email , password} , navigate));
   }

   return (
      <div className='login__container w-70 m-auto py-30'>
         <h1 className='font-xl font-500 text-dark '>SIGN IN</h1>
         {error && <Alert variant='danger'>{error}</Alert>}
         {loading && <Loader />}
         <div className=' mt-20'>
            <form onSubmit={loginSubmitHanlder}>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Email</label>
                  <input type='email' 
                  required 
                  className='w-100 p-10 font-base mt-5'
                  value={email} 
                  placeholder="Email Adress"
                  onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className='mb-10'>
                  <label className='font-18 text-dark mb-5'>Password</label>
                  <input type='password' 
                  required
                  className='w-100 p-10 font-base mt-5'
                  placeholder="Your Password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className='login__submitBtn mt-20'>
                  <button className='btn btn-primary' type='submit'>LOGIN</button>
               </div>
            </form>
            <div className='mt-15 font-sm'>
               <p>New User? <Link to='/register' className='text-dark text-underline'>Register</Link></p>
            </div>
         </div>
      </div>
   )
}

export default Login