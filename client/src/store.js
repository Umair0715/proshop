import { createStore , applyMiddleware , combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createProductReducer, createReviewReducer, productDetailsReducer, productsListReducer, updateProductReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { getSingleUserReducer, updateUserReducer, userDeleteReducer, userDetailsReducer, userLoginReducer , userRegisterReducer, usersListReducer } from './reducers/userReducer';
import { allOrdersReducer, createOrderReducer, myOrdersReducer, orderDeliverReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducer';

const reducers = combineReducers({
   products : productsListReducer ,
   product : productDetailsReducer ,
   cart : cartReducer ,
   login : userLoginReducer ,
   register : userRegisterReducer ,
   user : userDetailsReducer , 
   order : createOrderReducer ,
   orderDetails : orderDetailsReducer ,
   pay : orderPayReducer ,
   myOrders : myOrdersReducer ,
   usersList : usersListReducer ,
   userDelete : userDeleteReducer , 
   singleUser : getSingleUserReducer,
   updateUser : updateUserReducer ,
   newProduct : createProductReducer ,
   updateProduct : updateProductReducer ,
   allOrders : allOrdersReducer ,
   orderDeliver : orderDeliverReducer ,
   review : createReviewReducer
});

const initialState = {
   cart : {
      cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] , 
      shippingInfo : localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : null ,
      paymentMethod : localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'paypal'
   },
   login : {
      userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null 
   }
};

const store = createStore(reducers , initialState , composeWithDevTools(applyMiddleware(thunk)));

export default store ;