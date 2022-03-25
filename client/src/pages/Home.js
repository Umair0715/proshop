import React from 'react'
import Product from '../components/Home/Product';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../actions/productAction';
import Loader from './../components/loader/Loader';
import Alert from './../components/alert/Alert';
import { useParams , useNavigate } from 'react-router-dom';
import Paginate from '../components/paginate/Paginate';
import TopProducts from '../components/Home/TopProducts';



const HomePage = () => {
   const navigate = useNavigate();
   const { pageNumber } = useParams() || 1;
   const { keyword  } = useParams();
   const dispatch = useDispatch();
   const { loading , error , products , pages , page } = useSelector(state => state.products);
   useEffect(() => {
      dispatch(getAllProducts( keyword , pageNumber ));
   },[dispatch , keyword , pageNumber ])

   return (
      loading ? <Loader />
      : error ? <Alert variant='danger'>{error}</Alert>
      : products &&  
      <div className='home__wrapper py-30'>
         {
            !keyword && page === 1 ? <TopProducts />
            : keyword && 
            <button className='btn font-sm' 
            style={{background: 'lightgrey'}}
            onClick={() => navigate(-1)}> Go Back </button>
         }
         <h1 className='font-xl text-dark mb-20 mt-20 font-500'>LATEST PRODUCTS</h1>
         <div className='products__container mt-20'>
            {
               products.map(product => {
                  return <Product key={product._id} product={product} />
               })
            }
         </div>
         <Paginate page={page} pages={pages} keyword={keyword} />
      </div>
   )
}

export default HomePage    