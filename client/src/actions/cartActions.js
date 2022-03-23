import {
   ADD_CART_ITEM ,
   ADD_PAYMENT_METHOD,
   ADD_SHIPPING_INFO,
   REMOVE_CART_ITEM
} 
from './../constants/cartConstants';
import axios from 'axios';

export const addToCart = (id , qty ) => async (dispatch , getState ) =>  {
   try{
      const { data : { product } } = await axios.get(`/api/product/${id}`);
      dispatch({ type : ADD_CART_ITEM , payload : {
         product : product._id ,
         image : product.image ,
         name : product.name ,
         price : product.price ,
         countInStock : product.countInStock ,
         qty  
      }});
      localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems));
   }catch(err){
      console.log(err , 'from add to cart action');
   }
}


export const addShippingInfo = ( shippingData , navigate ) => async ( dispatch , getState ) =>  {  
   dispatch({ type : ADD_SHIPPING_INFO , payload :  shippingData });
   localStorage.setItem('shippingInfo' , JSON.stringify(getState().cart.shippingInfo));
   navigate('/order/payment');
}

export const addPaymentMethod = ( paymentMethod , navigate ) => async ( dispatch , getState ) =>  {  
   dispatch({ type : ADD_PAYMENT_METHOD, payload :  paymentMethod });
   localStorage.setItem('paymentMethod' , JSON.stringify(getState().cart.paymentMethod));
   navigate('/order/place');
}

export const removeCartItem = (id) => async (dispatch , getState)  => {
   dispatch({ type : REMOVE_CART_ITEM , payload : id})
   localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems));
}