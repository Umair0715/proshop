import {
   CREATE_ORDER_FAIL ,
   CREATE_ORDER_REQUEST ,
   CREATE_ORDER_SUCCESS ,
   ORDER_DETAILS_REQUEST ,
   ORDER_DETAILS_SUCCESS ,
   ORDER_DETAILS_FAIL ,
   ORDER_PAY_SUCCESS ,
   ORDER_PAY_REQUEST ,
   ORDER_PAY_FAIL ,
   ORDER_PAY_RESET,
   MY_ORDERS_REQUEST,
   MY_ORDERS_SUCCESS,
   MY_ORDERS_FAIL
}
from './../constants/orderConstants';

export const createOrderReducer = (state = {newOrder : null } , action) => {
   switch (action.type) {
      case CREATE_ORDER_REQUEST:
         return {
            loading : true 
         }
      case CREATE_ORDER_SUCCESS: 
         return {
            loading : false ,
            newOrder : action.payload
         }
      case CREATE_ORDER_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      default:
         return state
   }
}

export const orderDetailsReducer = (state = {order : null } , action) => {
   switch (action.type) {
      case ORDER_DETAILS_REQUEST:
         return {
            loading : true 
         }
      case ORDER_DETAILS_SUCCESS: 
         return {
            loading : false ,
            order : action.payload
         }
      case ORDER_DETAILS_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      default:
         return state
   }
}

export const orderPayReducer = (state = { success : false }, action) => {
   switch (action.type) {
      case ORDER_PAY_REQUEST:
         return {
            loading : true 
         }
      case ORDER_PAY_SUCCESS: 
         return {
            loading : false ,
            success : true 
         }
      case ORDER_PAY_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      case ORDER_PAY_RESET: 
         return {
            orderPay : null 
         }
      default:
         return state
   }
}


export const myOrdersReducer = (state = {orders : [] }, action) => {
   switch (action.type) {
      case MY_ORDERS_REQUEST:
         return {
            loading : true 
         }
      case MY_ORDERS_SUCCESS: 
         return {
            loading : false ,
            orders : action.payload  
         }
      case MY_ORDERS_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      default:
         return state
   }
}