import {
   ALL_PRODUCTS_REQUEST ,
   ALL_PRODUCTS_SUCCESS ,
   ALL_PRODUCTS_FAIL ,
   SINGLE_PRODUCT_FAIL ,
   SINGLE_PRODUCT_REQUEST ,
   SINGLE_PRODUCT_SUCCESS
}
from './../constants/productConstants';

export const productsListReducer = (state={products : []} , action ) => {
   switch (action.type) {
      case ALL_PRODUCTS_REQUEST:
         return {
            ...state ,
            loading : true 
         }
      case ALL_PRODUCTS_SUCCESS : 
         return {
            ...state ,
            loading : false ,
            products : action.payload 
         }
      case ALL_PRODUCTS_FAIL : 
         return {
            loading : false ,
            error : action.payload 
         }
      default : return state 
   }
}


export const productDetailsReducer = (state={product : {}} , action ) => {
   switch (action.type) {
      case SINGLE_PRODUCT_REQUEST:
         return {
            ...state ,
            loading : true 
         }
      case SINGLE_PRODUCT_SUCCESS : 
         return {
            ...state ,
            loading : false ,
            product : action.payload 
         }
      case SINGLE_PRODUCT_FAIL : 
         return {
            loading : false ,
            error : action.payload 
         }
      default : return state 
   }
}