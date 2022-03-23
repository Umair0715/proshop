import {
   ADD_CART_ITEM ,
   ADD_PAYMENT_METHOD,
   ADD_SHIPPING_INFO,
   REMOVE_CART_ITEM,
   RESET_CART
}
from './../constants/cartConstants';

export const cartReducer = (state = { cartItems : [] , shippingInfo : {}} , action ) => {
   switch (action.type) {
      case ADD_CART_ITEM:
         const item = action.payload;
         const existItem = state.cartItems.find(x => x.product === item.product);
         if(existItem){
            return {
               ...state ,
               cartItems : state.cartItems.map(x => x.product === existItem.product ? item : x )
            }
         } else {
            return {
               ...state ,
               cartItems : [...state.cartItems , item ]
            }
         }
      case ADD_SHIPPING_INFO: 
         return {
            ...state ,
            shippingInfo : action.payload 
         }
      case ADD_PAYMENT_METHOD: 
         return {
            ...state ,
            paymentMethod : action.payload
         }
      case REMOVE_CART_ITEM: 
         return {
            ...state ,
            cartItems : state.cartItems.filter(item => item.product !== action.payload)
         }
      case RESET_CART: 
         return {
            ...state ,
            cartItems : [] 
         }
      default : return state ;
   }
}