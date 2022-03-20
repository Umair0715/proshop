import {
   ALL_PRODUCTS_REQUEST ,
   ALL_PRODUCTS_SUCCESS ,
   ALL_PRODUCTS_FAIL ,
   SINGLE_PRODUCT_FAIL ,
   SINGLE_PRODUCT_REQUEST ,
   SINGLE_PRODUCT_SUCCESS
}
from './../constants/productConstants';
import axios from 'axios';

export const getAllProducts = () => async dispatch => {
   dispatch({ type : ALL_PRODUCTS_REQUEST });
   try{
      const { data : { products } } = await axios.get('/api/products');
      dispatch({ type : ALL_PRODUCTS_SUCCESS , payload : products});
   }catch(err){
      dispatch({ type : ALL_PRODUCTS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const getSingleProduct = (id) => async dispatch => {
   dispatch({ type : SINGLE_PRODUCT_REQUEST });
   try{
      const { data : { product } } = await axios.get(`/api/product/${id}`);
      dispatch({ type : SINGLE_PRODUCT_SUCCESS , payload : product});
   }catch(err){
      dispatch({ type : SINGLE_PRODUCT_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}