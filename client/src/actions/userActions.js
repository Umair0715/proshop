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
   USER_DETAILS_RESET,
   USERS_LIST_REQUEST,
   USERS_LIST_SUCCESS,
   USERS_LIST_FAIL ,
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
import axios from 'axios';

export const loginUser = ( userData , navigate ) => async (dispatch , getState ) => {
   dispatch({ type : USER_LOGIN_REQUEST });
   try{ 
      const { data : { name , email , _id , token ,isAdmin  } } = await axios.post('/api/user/login' , userData  )
      // console.log(data);
      dispatch({ type : USER_LOGIN_SUCCESS , payload : { 
         name , email , _id , token , isAdmin
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
      const { data : { status , name , email , _id , token , isAdmin } } = await axios.put('/api/user' , updateData , config)
      if(status === 'success'){
         dispatch({ type : USER_LOGIN_SUCCESS ,  payload : 
            { name , email , _id , token , isAdmin}
         })
         localStorage.setItem('userInfo' , JSON.stringify(
            { name ,email , _id , token , isAdmin  }
         ))
         window.location.reload();
      }
   }catch(err){
      dispatch({ type : USER_DETAILS_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}


// GET ALL USERS 
export const getAllUsers= () => async (dispatch, getState)  => {
   const { userInfo : { token }} = getState().login;
   dispatch({ type : USERS_LIST_REQUEST });
   try{ 
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      const { data : { users } } = await axios.get('/api/user/usersList' , config)
      dispatch({ type : USERS_LIST_SUCCESS , payload : users })

   }catch(err){
      dispatch({ type : USERS_LIST_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

// GET ALL USERS 
export const deleteUser= ( id  ) => async (dispatch, getState)  => {
   const { userInfo : { token }} = getState().login;
   dispatch({ type : USER_DELETE_REQUEST });
   try{ 
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      await axios.delete(`/api/user/${id}` , config)
      dispatch({ type : USER_DELETE_SUCCESS })
      
   }catch(err){
      dispatch({ type : USER_DELETE_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}


export const getSingleUser = ( id  ) => async (dispatch, getState)  => {
   const { userInfo : { token }} = getState().login;
   dispatch({ type : GET_USER_REQUEST });
   try{ 
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      const { data : { user } } = await axios.get(`/api/user/${id}` , config)
      dispatch({ type : GET_USER_SUCCESS , payload : user })
      
   }catch(err){
      dispatch({ type : GET_USER_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}


export const updateUser = ( id , newData , navigate ) => async (dispatch, getState)  => {
   const { userInfo : { token }} = getState().login;
   dispatch({ type : UPDATE_USER_REQUEST });
   try{ 
      const config = {
         headers : {
            authorization : `Bearer ${token}`
         }
      }
      const { data : { user } } = await axios.put(`/api/user/${id}` , newData , config)
      dispatch({ type : UPDATE_USER_SUCCESS , payload : user })
      navigate('/admin/usersList');
   }catch(err){
      dispatch({ type : UPDATE_USER_FAIL ,  payload : err.response && err.response.data.message ? err.response.data.message : err.message })
   }
}

export const logoutUser = () => async dispatch => {
   localStorage.setItem('userInfo' , null );
   dispatch({ type : USER_LOGOUT})
   dispatch({ type : USER_DETAILS_RESET})
}