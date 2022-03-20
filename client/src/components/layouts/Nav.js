import './Layouts.css';
import { Link } from 'react-router-dom';

const Nav = () => {
   return (
      <nav className='nav'>
         <div className='w-85 m-auto flex items-center justify-between'>
            <div className='nav__left'>
               <Link to='/' className='text-white'>
                  <h1 className='font-xl text-white font-600'>PROSHOP</h1>
               </Link>   
            </div>   
            <div className='nav__right flex items-center'>
               <div>
                  <Link className='font-sm' to='/cart'>
                     <i className='fas fa-shopping-cart'></i>
                     <span>CART</span>
                  </Link>   
               </div>   
               <div className='ml-20'>
                  <Link className='font-sm' to='/login'>
                     <i className='fas fa-user'></i>
                     <span>SIGN IN</span>      
                  </Link>   
                </div>   
            </div>   
         </div> 
      </nav>
   )
}

export default Nav