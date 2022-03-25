import {
   ALL_PRODUCTS_REQUEST ,
   ALL_PRODUCTS_SUCCESS ,
   ALL_PRODUCTS_FAIL ,
   SINGLE_PRODUCT_FAIL ,
   SINGLE_PRODUCT_REQUEST ,
   SINGLE_PRODUCT_SUCCESS , 
   CREATE_PRODUCT_REQUEST,
   CREATE_PRODUCT_SUCCESS,
   CREATE_PRODUCT_FAIL,
   UPDATE_PRODUCT_REQUEST,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_FAIL,
   DELETE_PRODUCT_REQUEST,
   DELETE_PRODUCT_SUCCESS,
   DELETE_PRODUCT_FAIL ,
   CREATE_REVIEW_REQUEST,
   CREATE_REVIEW_SUCCESS,
   CREATE_REVIEW_FAIL,
   TOP_PRODUCTS_REQUEST ,
   TOP_PRODUCTS_SUCCESS ,
   TOP_PRODUCTS_FAIL ,

}
from './../constants/productConstants';
import axios from 'axios';

export const getAllProducts = (keyword = '' , pageNumber ='') => async dispatch => {
   dispatch({ type : ALL_PRODUCTS_REQUEST });
   try{
      const { data : { products , page , pages  } } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
      dispatch({ type : ALL_PRODUCTS_SUCCESS , payload : {products , pages , page}});
   }catch(err){
      dispatch({ type : ALL_PRODUCTS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const getTopProducts = () => async dispatch => {
   dispatch({ type : TOP_PRODUCTS_REQUEST });
   try{
      const { data : { products } } = await axios.get(`/api/products/top`);
      dispatch({ type : TOP_PRODUCTS_SUCCESS , payload : { products }});
   }catch(err){
      dispatch({ type : TOP_PRODUCTS_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message })
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


export const createProduct = navigate => async (dispatch , getState) => {
   dispatch({ type : CREATE_PRODUCT_REQUEST });
   try{
      const { userInfo : { token } } = getState().login;
      const config = {
         headers : {
            'Contect-Type' : 'application/json',
            authorization : `Bearer ${token}`
         }
      }
      const { data : { product } } = await axios.post(`/api/product` , {} , config );
      dispatch({ type : CREATE_PRODUCT_SUCCESS , payload : product});
      const { product : { _id } } = getState().newProduct;
      navigate(`/admin/product/update/${_id}`)
   }catch(err){
      dispatch({ type : CREATE_PRODUCT_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const updateProduct = ( newData , id , navigate ) => async (dispatch , getState) => {
   dispatch({ type : UPDATE_PRODUCT_REQUEST });
   try{
      const { userInfo : { token } } = getState().login;
      const config = {
         headers : {
            'Contect-Type' : 'application/json',
            authorization : `Bearer ${token}`
         }
      }
      await axios.put(`/api/product/${id}` , newData , config );
      dispatch({ type : UPDATE_PRODUCT_SUCCESS });
      navigate(`/admin/products`)
   }catch(err){
      dispatch({ type : UPDATE_PRODUCT_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const deleteProduct = ( id ) => async (dispatch , getState) => {
   dispatch({ type : DELETE_PRODUCT_REQUEST });
   try{
      const { userInfo : { token } } = getState().login;
      const config = {
         headers : {
            'Contect-Type' : 'application/json',
            authorization : `Bearer ${token}`
         }
      }
      await axios.delete(`/api/product/${id}` , config );
      dispatch({ type : DELETE_PRODUCT_SUCCESS });
      window.location.reload();
   }catch(err){
      dispatch({ type : DELETE_PRODUCT_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}


export const createReview = ( id , reviewData ) => async (dispatch , getState) => {
   dispatch({ type : CREATE_REVIEW_REQUEST });
   try{
      const { userInfo : { token } } = getState().login;
      const config = {
         headers : {
            'Contect-Type' : 'application/json',
            authorization : `Bearer ${token}`
         }
      }
      await axios.post(`/api/review/${id}` , reviewData , config );
      dispatch({ type : CREATE_REVIEW_SUCCESS });
      setTimeout(() => {
         window.location.reload();
      }, 1000 )
   }catch(err){
      dispatch({ type : CREATE_REVIEW_FAIL , payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}