import './Layouts.css';
import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { logoutUser } from './../../actions/userActions';
import SearchBox from './SearchBox';

const Nav = () => {
   const dispatch = useDispatch();
   const { userInfo } = useSelector(state => state.login);

   return (
      <nav className='nav'>
         <div className='w-85 m-auto flex items-center justify-between'>
            <div className='nav__left flex items-center'>
               <Link to='/' className='text-white'>
                  <h1 className='font-xl text-white font-600'>PROSHOP</h1>
               </Link>   
               <SearchBox />
            </div> 
            <div className='nav__right flex items-center'>
               <div>
                  <Link className='font-sm' to='/cart'>
                     <i className='fas fa-shopping-cart'></i>
                     <span>CART</span>
                  </Link>   
               </div>  
               {
                  userInfo && userInfo.name ? 
                  <>
                     <div className='ml-20'>
                        <Link className='font-sm' to='/profile' title='Profile'>
                           <i className='fas fa-user'></i>
                           <span className='text-uppercase'>{userInfo.name}</span>      
                        </Link>   
                     </div>
                     <div className='ml-20'>
                        <Link className='font-sm' to='/login' 
                        onClick={() => dispatch(logoutUser())}>
                           <span>
                              LOGOUT
                           </span>      
                        </Link>   
                     </div>
                  </> 
                  :
                  <div className='ml-20'>
                     <Link className='font-sm' to='/login'>
                        <i className='fas fa-user'></i>
                        <span>SIGN IN</span>      
                     </Link>   
                  </div> 

               } 
               {
                  userInfo && userInfo.isAdmin && 
                  <div className="dropdown ml-20 text-white font-sm pointer">
                     <div className='flex items-center'>
                        <span className="dropbtn">ADMIN</span>
                        <i className="fa-solid fa-caret-down ml-5"></i>
                     </div>
                     <div className="dropdown-content">
                        <Link to='/admin/usersList'>
                           Users
                        </Link>
                        <Link to='/admin/products'>Products</Link>
                        <Link to='/admin/orders'>Orders</Link>
                     </div>
                  </div>
               }
                      
            </div>   
         </div> 
      </nav>
   )
}

export default Nav
