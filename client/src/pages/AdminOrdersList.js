import {useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import Loader from './../components/loader/Loader';
import Alert from './../components/alert/Alert';
import { Link , useNavigate} from 'react-router-dom'
import Moment from 'react-moment';
import { getAllOrders } from '../actions/orderActions';


const AdminOrdersList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { orders , loading , error  } = useSelector(state => state.allOrders);

   useEffect(() => {
      dispatch(getAllOrders());
   },[ dispatch ])

   return (
      <div className='w-80 m-auto py-30'>
      <button className='btn' 
      style={{background : 'lightgrey'}}
      onClick={() => navigate(-1)}>
         Go Back
      </button>
      <h1 className='font-xl font-500 text-dark mt-20'>ORDERS LIST</h1>    
      {
         loading ? <Loader />
         : error ? <Alert variant='danger'>{error}</Alert>
         : orders && 
         <table className='mt-20'>
               <thead>
                  <tr>
                     <th scope="col">ID</th>
                     <th scope="col">USER</th>
                     <th scope="col">DATE</th>
                     <th scope="col">TOTLA</th>
                     <th scope="col">PAID</th>
                     <th scope="col">DELIVERED</th>
                     <th scope="col"></th>
                  </tr>
               </thead>
               <tbody>
                  {
                     orders.map(order => {
                        return ( 
                           <tr key={order._id}>
                           <td data-label="ID" >{order._id}</td>
                           <td data-label="USER">
                              {order.user ? order.user.name : ''}
                           </td>
                           <td data-label="DATE">
                              <Moment format='DD-MM-YYYY'>
                                 {order.createdAt}
                              </Moment>
                           </td>
                           <td data-label="TOTAL">
                              {order.totalPrice}
                           </td>
                           <td data-label="PAID">
                              {
                                 order.isPaid ?
                                 <Moment format='DD-MM-YYYY'>
                                    {order.paidAt}
                                 </Moment>
                                 : 
                                 <i className='fas fa-times' style={{color: 'red'}}></i>
                              }
                           </td>
                           <td data-label="DELIVERED" >
                              {
                                 order.isDelivered ? 
                                 <Moment format='DD-MM-YYYY'>
                                    {order.deliveredAt}
                                 </Moment>
                                 : <i className='fas fa-times'></i>
                              }
                           </td>
                           <td data-label="" className='text-center'>
                              {
                                 <Link to={`/admin/order/${order._id}`}>
                                    <button className='btn'
                                    style={{background : 'lightgrey'}}>
                                       View Details
                                    </button>
                                 </Link>
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

export default AdminOrdersList