import {useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import Loader from './../components/loader/Loader';
import Alert from './../components/alert/Alert';
import { Link , useNavigate} from 'react-router-dom'
import { createProduct, deleteProduct, getAllProducts } from '../actions/productAction';

const AdminProductList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { products , loading , error  } = useSelector(state => state.products);

   useEffect(() => {
      dispatch(getAllProducts());
   },[ dispatch ])

   const deleteHandler = id => {
     dispatch(deleteProduct(id));
   }

   const createProductHandler = () => {
      dispatch(createProduct(navigate))
   }

   return (
      <div className='w-80 m-auto py-30'>
      <button className='btn' 
      style={{background : 'lightgrey'}}
      onClick={() => navigate(-1)}>
         Go Back
      </button>
      <div className='adminProducts__header w-100 flex justify-between items-center my-20'>
         <h1 className='font-xl font-500 text-dark'>PRODUCTS</h1>
         <div className='flex items-center'>
            <button className='btn btn-primary'
            onClick={createProductHandler}>
               <i className='fas fa-plus mr-5'></i>
               CREATE PRODUCT
            </button>
         </div>
      </div>
      {
         loading ? <Loader />
         : error ? <Alert variant='danger'>{error}</Alert>
         : products && 
         <table className='mt-20'>
               <thead>
                  <tr>
                     <th scope="col">ID</th>
                     <th scope="col">NAME</th>
                     <th scope="col">PRICE</th>
                     <th scope="col">CATEGORY</th>
                     <th scope="col">BRAND</th>
                     <th scope="col"></th>
                  </tr>
               </thead>
               <tbody>
                  {
                     products.map(product => {
                        return ( 
                           <tr key={product._id}>
                           <td data-label="ID" >{product._id}</td>
                           <td data-label="NAME">
                              {product.name}
                           </td>
                           <td data-label="PRICE">
                              {product.price}
                           </td>
                           <td data-label="CATEGORY" className='text-center' >
                              {product.category}
                           </td>
                           <td data-label="CATEGORY" className='text-center' >
                              {product.brand}
                           </td>
                           <td data-label="" className='userEditBtns text-center'>
                              {
                                 <>
                                    <Link to={`/admin/product/update/${product._id}`}>
                                       <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button onClick={() => deleteHandler(product._id)}>
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

export default AdminProductList