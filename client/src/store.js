import { createStore , applyMiddleware , combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productsListReducer } from './reducers/productReducer';

const reducers = combineReducers({
   products : productsListReducer ,
   product : productDetailsReducer
});

const initialState = {};

const store = createStore(reducers , initialState , composeWithDevTools(applyMiddleware(thunk)));

export default store ;