import {
   CREATE_ORDER_FAIL ,
   CREATE_ORDER_REQUEST ,
   CREATE_ORDER_SUCCESS ,
   ORDER_DETAILS_REQUEST ,
   ORDER_DETAILS_SUCCESS ,
   ORDER_DETAILS_FAIL ,
   ORDER_PAY_SUCCESS ,
   ORDER_PAY_REQUEST ,
   ORDER_PAY_FAIL, 
   MY_ORDERS_REQUEST,
   MY_ORDERS_SUCCESS,
   MY_ORDERS_FAIL
}
from './../constants/orderConstants';
import { RESET_CART } from '../constants/cartConstants';
import axios from 'axios';

export const createOrder = (orderData, navigate) => async (dispatch , getState) => {
   dispatch({ type : CREATE_ORDER_REQUEST});
   const token = getState().login.userInfo.token;
   try{
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      const { data : { order }} = await axios.post('/api/order' , orderData , config);
      dispatch({ type : CREATE_ORDER_SUCCESS , payload : order})
      const { _id }= getState().order.newOrder;
      navigate(`/order/${_id}`)
      dispatch({ type : RESET_CART})
      localStorage.setItem('cartItems' , []);
   }catch(err){
      dispatch({type : CREATE_ORDER_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message})
   }
}


// GET ORDER DETAILS
export const getOrderDetails = id => async (dispatch , getState) => {
   dispatch({ type : ORDER_DETAILS_REQUEST});
   const token = getState().login.userInfo.token;
   try{
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      const { data : { order }} = await axios.get(`/api/order/${id}` , config );
      dispatch({ type : ORDER_DETAILS_SUCCESS , payload : order})
      
   }catch(err){
      dispatch({type : ORDER_DETAILS_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message})
   }
}


// UPDATE ORDER TO PAY
export const payOrder = (id , paymentResult) => async (dispatch , getState) => {
   dispatch({ type : ORDER_PAY_REQUEST});
   const token = getState().login.userInfo.token;
   try{
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      await axios.put(`/api/order/${id}/pay` , paymentResult , config );
      dispatch({ type : ORDER_PAY_SUCCESS })
      
   }catch(err){
      dispatch({type : ORDER_PAY_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message})
   }
}



// UPDATE ORDER TO PAY
export const myOrders = () => async (dispatch , getState) => {
   dispatch({ type : MY_ORDERS_REQUEST});
   const token = getState().login.userInfo.token;
   try{
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      const { data : { orders } } = await axios.get(`/api/order/myOrders` , config );
      dispatch({ type : MY_ORDERS_SUCCESS , payload : orders })
      
   }catch(err){
      dispatch({type : MY_ORDERS_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message})
   }
}