import { createStore , applyMiddleware , combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productsListReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { userDetailsReducer, userLoginReducer , userRegisterReducer } from './reducers/userReducer';

const reducers = combineReducers({
   products : productsListReducer ,
   product : productDetailsReducer ,
   cart : cartReducer ,
   login : userLoginReducer ,
   register : userRegisterReducer ,
   user : userDetailsReducer
});

const initialState = {
   cart : {
      cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
   },
   login : {
      userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null 
   }
};

const store = createStore(reducers , initialState , composeWithDevTools(applyMiddleware(thunk)));

export default store ;