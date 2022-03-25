import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
   const navigate = useNavigate();
   const [keyword , setKeyword ] = useState('');

   const searchSubmitHandler = (e) => {
      e.preventDefault();
      if(keyword.trim()){
         return navigate(`/search/${keyword}`);
      }
      return navigate('/');
   }

   return (
      <div className='nav-center font-sm' style={{marginLeft :'50px'}}>
         <form onSubmit={searchSubmitHandler} className='flex items-center'>
            <input type='text' value={keyword}
            className='p-10' 
            style={{outline: 'none'}}
            placeholder='Search products...'
            onChange={(e) => setKeyword(e.target.value)}
            />
            <div>
               <button className='p-10' style={{border: '2px solid green' , color: 'green' , marginLeft : '5px' , background : 'none'}}>
                  SEARCH
               </button>
            </div>
         </form>
      </div>
   )
}

export default SearchBox