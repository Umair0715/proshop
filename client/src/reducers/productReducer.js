import {
   ALL_PRODUCTS_REQUEST ,
   ALL_PRODUCTS_SUCCESS ,
   ALL_PRODUCTS_FAIL ,
   SINGLE_PRODUCT_FAIL ,
   SINGLE_PRODUCT_REQUEST ,
   SINGLE_PRODUCT_SUCCESS,
   CREATE_PRODUCT_REQUEST,
   CREATE_PRODUCT_SUCCESS,
   CREATE_PRODUCT_FAIL,
   UPDATE_PRODUCT_REQUEST,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_FAIL ,
   DELETE_PRODUCT_REQUEST ,
   DELETE_PRODUCT_SUCCESS ,
   DELETE_PRODUCT_FAIL ,
   CREATE_REVIEW_REQUEST,
   CREATE_REVIEW_SUCCESS,
   CREATE_REVIEW_FAIL,
   TOP_PRODUCTS_REQUEST ,
   TOP_PRODUCTS_SUCCESS ,
   TOP_PRODUCTS_FAIL ,
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
            products : action.payload.products ,
            page : action.payload.page ,
            pages : action.payload.pages 
         }
      case ALL_PRODUCTS_FAIL : 
         return {
            loading : false ,
            error : action.payload 
         }
      default : return state 
   }
}

export const topProductsReducer = (state={products : []} , action ) => {
   switch (action.type) {
      case TOP_PRODUCTS_REQUEST:
         return {
            ...state ,
            loading : true 
         }
      case TOP_PRODUCTS_SUCCESS : 
         return {
            ...state ,
            loading : false ,
            products : action.payload.products ,
         }
      case TOP_PRODUCTS_FAIL : 
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

export const createProductReducer = (state={product : {}} , action ) => {
   switch (action.type) {
      case CREATE_PRODUCT_REQUEST:
         return {
            loading : true 
         }
      case CREATE_PRODUCT_SUCCESS : 
         return {
            loading : false ,
            product : action.payload 
         }
      case CREATE_PRODUCT_FAIL : 
         return {
            loading : false ,
            error : action.payload 
         }
      default : return state 
   }
}

export const updateProductReducer = (state={ } , action ) => {
   switch (action.type) {
      case UPDATE_PRODUCT_REQUEST:
         return {
            loading : true 
         }
      case UPDATE_PRODUCT_SUCCESS : 
         return {
            loading : false ,
            success : true ,
         }
      case UPDATE_PRODUCT_FAIL : 
         return {
            loading : false ,
            error : action.payload 
         }
      default : return state 
   }
}

export const deleteProductReducer = (state={ } , action ) => {
   switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
         return {
            loading : true 
         }
      case DELETE_PRODUCT_SUCCESS : 
         return {
            loading : false ,
            success : true ,
         }
      case DELETE_PRODUCT_FAIL : 
         return {
            loading : false ,
            error : action.payload 
         }
      default : return state 
   }
}



export const createReviewReducer = (state={ } , action ) => {
   switch (action.type) {
      case CREATE_REVIEW_REQUEST:
         return {
            loading : true 
         }
      case CREATE_REVIEW_SUCCESS : 
         return {
            loading : false ,
            success : true ,
         }
      case CREATE_REVIEW_FAIL : 
         return {
            loading : false ,
            error : action.payload 
         }
      default : return state 
   }
}