import {
   ADD_CART_ITEM ,
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

export const removeCartItem = (id) => async (dispatch , getState)  => {
   dispatch({ type : REMOVE_CART_ITEM , payload : id})
   localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems));
}