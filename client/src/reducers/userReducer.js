import {
   USER_LOGIN_REQUEST ,
   USER_LOGIN_SUCCESS ,
   USER_LOGIN_FAIL ,
   USER_LOGOUT , 
   USER_REGISTER_REQUEST , 
   USER_REGISTER_SUCCESS ,
   USER_REGISTER_FAIL ,
   USER_DETAILS_REQUEST , 
   USER_DETAILS_SUCCESS ,
   USER_DETAILS_RESET ,
   USER_DETAILS_FAIL,
   USERS_LIST_REQUEST,
   USERS_LIST_SUCCESS,
   USERS_LIST_FAIL,
   USER_DELETE_REQUEST,
   USER_DELETE_SUCCESS,
   USER_DELETE_FAIL,
   GET_USER_REQUEST,
   GET_USER_SUCCESS,
   GET_USER_FAIL ,
   UPDATE_USER_REQUEST ,
   UPDATE_USER_SUCCESS ,
   UPDATE_USER_FAIL
} 
from './../constants/userConstants';

export const userLoginReducer = (state = { userInfo : null } , action ) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
         return {
            ...state ,
            loading : true 
         }
      case USER_LOGIN_SUCCESS: 
         return {
            loading : false ,
            userInfo : action.payload 
         }
      case USER_LOGIN_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      case USER_LOGOUT: 
         return {
            userInfo : null 
         }
      default:
         return state 
   }
}

export const userRegisterReducer = (state = {} , action ) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return {
            ...state ,
            loading : true 
         }
      case USER_REGISTER_SUCCESS: 
         return {
            loading : false ,
            status : action.payload 
         }
      case USER_REGISTER_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      default : return state ;
   }
}


export const userDetailsReducer = (state = {userDetails : {}} , action ) => {
   switch (action.type) {
      case USER_DETAILS_REQUEST:
         return {
            ...state ,
            loading : true 
         }
      case USER_DETAILS_SUCCESS: 
         return {
            loading : false ,
            userDetails : action.payload 
         }
      case USER_DETAILS_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      case USER_DETAILS_RESET: 
         return {
            userDetails : null
         }
      default : return state ;
   }
}

export const usersListReducer = (state = {users : []} , action ) => {
   switch (action.type) {
      case USERS_LIST_REQUEST:
         return {
            ...state ,
            loading : true 
         }
      case USERS_LIST_SUCCESS: 
         return {
            loading : false ,
            users : action.payload 
         }
      case USERS_LIST_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      default : return state ;
   }
}


export const userDeleteReducer = (state = {} , action ) => {
   switch (action.type) {
      case USER_DELETE_REQUEST:
         return {
            loading : true 
         }
      case USER_DELETE_SUCCESS: 
         return {
            loading : false ,
            success : true  
         }
      case USER_DELETE_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      default : return state ;
   }
}


export const getSingleUserReducer = (state = {user : null} , action ) => {
   switch (action.type) {
      case GET_USER_REQUEST:
         return {
            loading : true 
         }
      case GET_USER_SUCCESS: 
         return {
            loading : false ,
            user : action.payload   
         }
      case GET_USER_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      default : return state ;
   }
}



export const updateUserReducer = (state = {user : null} , action ) => {
   switch (action.type) {
      case UPDATE_USER_REQUEST:
         return {
            loading : true 
         }
      case UPDATE_USER_SUCCESS: 
         return {
            loading : false ,
            user : action.payload   
         }
      case UPDATE_USER_FAIL: 
         return {
            loading : false ,
            error : action.payload
         }
      default : return state ;
   }
}