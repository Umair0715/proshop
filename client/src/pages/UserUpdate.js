import { useState , useEffect} from 'react'
import { useNavigate , useParams } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import Alert from './../components/alert/Alert';
import Loader from './../components/loader/Loader'
import { getSingleUser, updateUser } from './../actions/userActions';

const UserUpdate = () => {
   const { id } = useParams();
   const [name, setName ] = useState('');
   const [email , setEmail ] = useState('');
   const [isAdmin, setIsAdmin ] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { user , loading , error } = useSelector(state => state.singleUser);

   useEffect(() => {
      dispatch(getSingleUser(id));
   },[dispatch , id  ])

   useEffect(() => {
      if(user){
         setName(user.name)
         setEmail(user.email)
         setIsAdmin(user.isAdmin)
      }
   },[user]);

   const updateSubmitHanlder = (e) => {
      e.preventDefault();
      dispatch(updateUser(id , { name , email , isAdmin } , navigate))
   }

   return (
      <div className='login__container w-50 m-auto py-30'>
         <h1 className='font-xl font-500 text-dark '>UPDATE USER</h1>
         {
            error ? <Alert variant='danger'>{error}</Alert>
            : loading ? <Loader />
            :
            <div className=' mt-20'>
               <form onSubmit={updateSubmitHanlder}>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Name</label>
                     <input type='text' 
                     className='w-100 p-10 font-base mt-5'
                     placeholder="Your Name"
                     value={name} 
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
                  <div className='my-20'>
                     <input type='checkbox' 
                     className=''
                     checked={isAdmin} 
                     id='adminCheck'
                     onChange={(e) => setIsAdmin(!isAdmin)}
                     />
                     <label htmlFor='adminCheck' className='font-base text-dark ml-10'>Admin</label>
                  </div>
                  <div className='login__submitBtn mt-20'>
                     <button className='btn btn-primary' type='submit'>UPDATE</button>
                  </div>
               </form>
            </div>
         }
      </div>
   )
}

export default UserUpdate;