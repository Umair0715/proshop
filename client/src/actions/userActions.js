import {
   USER_LOGIN_REQUEST ,
   USER_LOGIN_SUCCESS ,
   USER_LOGIN_FAIL ,
   USER_REGISTER_REQUEST , 
   USER_REGISTER_SUCCESS ,
   USER_REGISTER_FAIL,
   USER_DETAILS_REQUEST , 
   USER_DETAILS_SUCCESS ,
   USER_DETAILS_FAIL,
   USER_LOGOUT,
   USER_DETAILS_RESET
} 
from './../constants/userConstants';
import axios from 'axios';

export const loginUser = ( userData , navigate ) => async (dispatch , getState ) => {
   dispatch({ type : USER_LOGIN_REQUEST });
   try{ 
      const { data : { name , email , _id , token  } } = await axios.post('/api/user/login' , userData  )
      dispatch({ type : USER_LOGIN_SUCCESS , payload : { 
         name , email , _id , token 
      }})
      localStorage.setItem('userInfo' , JSON.stringify(getState().login.userInfo))
      navigate('/');
   }catch(err){
      dispatch({ type : USER_LOGIN_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const registerUser = ( userData , navigate ) => async dispatch  => {
   dispatch({ type : USER_REGISTER_REQUEST });
   try{ 
      const { data : { status } } = await axios.post('/api/user/register' , userData  )
      dispatch({ type : USER_REGISTER_SUCCESS , payload : status })
      navigate('/login');
   }catch(err){
      dispatch({ type : USER_REGISTER_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

// GET USER DETAILS
export const getUserDetails = ( token ) => async dispatch  => {
   dispatch({ type : USER_DETAILS_REQUEST });
   try{ 
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      const { data : { name , email , _id } } = await axios.get('/api/user' , config)
      dispatch({ type : USER_DETAILS_SUCCESS , payload : { name , email , _id} })

   }catch(err){
      dispatch({ type : USER_DETAILS_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

// UPDATE PROFILE
// GET USER DETAILS
export const updateUserProfile = ( updateData, passedToken ) => async (dispatch, getState ) => {
   try{ 
      const config = {
         headers : {
            authorization : `Bearer ${passedToken}`
         }
      }
      const { data : { status , name , email , _id , token } } = await axios.put('/api/user' , updateData , config)
      if(status === 'success'){
         dispatch({ type : USER_LOGIN_SUCCESS ,  payload : 
            { name , email , _id , token}
         })
         localStorage.setItem('userInfo' , JSON.stringify(
            { name ,email , _id , token}
         ))
         window.location.reload();
      }
   }catch(err){
      dispatch({ type : USER_DETAILS_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const logoutUser = () => async dispatch => {
   localStorage.setItem('userInfo' , null );
   dispatch({ type : USER_LOGOUT})
   dispatch({ type : USER_DETAILS_RESET})
}