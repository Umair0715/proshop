import React from 'react'
import Product from '../components/Home/Product';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../actions/productAction';
import Loader from './../components/loader/Loader';
import Alert from './../components/alert/Alert';
import { useParams } from 'react-router-dom';



const HomePage = () => {
   const { keyword } = useParams();
   const dispatch = useDispatch();
   const { loading , error , products } = useSelector(state => state.products);
   useEffect(() => {
      dispatch(getAllProducts(keyword));
   },[dispatch , keyword])

   return (
      loading ? <Loader />
      : error ? <Alert variant='danger'>{error}</Alert>
      : products &&  
      <div className='home__wrapper py-30'>
         <h1 className='font-xl text-dark mb-20 font-500'>LATEST PRODUCTS</h1>
         <div className='products__container mt-20'>
            {
               products.map(product => {
                  return <Product key={product._id} product={product} />
               })
            }
         </div>
      </div>
   )
}

export default HomePage    