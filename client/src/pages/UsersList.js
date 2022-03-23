import {useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import Loader from './../components/loader/Loader';
import Alert from './../components/alert/Alert';
import { deleteUser, getAllUsers } from './../actions/userActions'
import { Link } from 'react-router-dom'

const UsersList = () => {
   const dispatch = useDispatch();
   const { success } = useSelector(state => state.userDelete);
   const { users , loading , error } = useSelector(state => state.usersList)
   const { userInfo } = useSelector(state => state.login);
   useEffect(() => {
      dispatch(getAllUsers());
   },[dispatch, success ])

   const deleteHandler = id => {
      if( id === userInfo._id){
         return alert('You Cant perform this action.')
      }
      dispatch(deleteUser(id));
   }

   return (
      <div className='w-80 m-auto my-30'>
      <h1 className='font-xl font-500 text-dark mb-20'>REGISTERED USERS</h1>
      {
         loading ? <Loader />
         : error ? <Alert variant='danger'>{error}</Alert>
         : users && 
         <table className='mt-20'>
               <thead>
                  <tr>
                     <th scope="col">ID</th>
                     <th scope="col">NAME</th>
                     <th scope="col">EMAIL</th>
                     <th scope="col">ADMIN</th>
                     <th scope="col"></th>
                  </tr>
               </thead>
               <tbody>
                  {
                     users.map(user => {
                        return ( 
                           <tr key={user._id}>
                           <td data-label="ID" >{user._id}</td>
                           <td data-label="DATE">
                              {user.name}
                           </td>
                           <td data-label="TOTAL">
                              {user.email}
                           </td>
                           <td data-label="PAID" className='text-center' >
                              {
                                 user.isAdmin ? <i style={{color: 'green'}} className='fas fa-check'></i>
                                 : <i style={{color: 'red'}} className='fas fa-times'></i>
                              }
                           </td>
                           <td data-label="DELIVERED" className='userEditBtns text-center'>
                              {
                                 <>
                                    <Link to={`/admin/user/update/${user._id}`}>
                                       <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button onClick={() => deleteHandler(user._id)}>
                                       <i className="fas fa-trash"></i>
                                    </button>  
                                 </>
                              }
                           </td>
                        </tr>
                       )
                     })
                  }
               </tbody>
            </table>

      }
   </div>
   )
}

export default UsersList