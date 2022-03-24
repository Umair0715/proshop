import { useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import Alert from './../components/alert/Alert';
import Loader from './../components/loader/Loader'
import { useNavigate , useParams } from 'react-router-dom';
import { getSingleProduct, updateProduct } from '../actions/productAction';
import axios from 'axios';

const NewProduct = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { loading , error , product } = useSelector(state => state.product)
  
   const [name , setName ] = useState('');
   const [image , setImage ] = useState('');
   const [price , setPrice ] = useState(0);
   const [brand, setBrand ] = useState('');
   const [category, setCategory ] = useState('');
   const [description, setDescription ] = useState('');
   const [countInStock, setCountInStock ] = useState(0);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getSingleProduct(id))
   }, [dispatch , id])
   
   useEffect(() => {
      if(product){
         setName(product.name ? product.name : '');
         setPrice(product.price ? product.price : 0)
         setBrand(product.brand ? product.brand : '')
         setCategory(product.category ? product.category : '')
         setDescription(product.description ? product.description : '')
         setImage(product.image ? product.image : '')
         setCountInStock(product.countInStock ? product.countInStock : 0)
      }
   },[product])
   const productData = {
      name , image , price , description , category , countInStock , brand
   }
   const updateProductHandler = (e) => {
      e.preventDefault();
      dispatch(updateProduct(productData , id , navigate))
   }

   const uploadHandler = async (e) => {
      const file = e.target.files[0];
      try{
         const formData = new FormData();
         formData.append('image' , file);
         const config = {
            headers : {
               'Content-type' : 'multipart/form-data'
            }
         }
         const { data } = await axios.post('/api/upload' , formData , config);
         setImage(data)
      }catch(err){
         console.log(err , 'from file upload')
      }
   }
   
   return (
      <div className='login__container w-100 m-auto py-30'>
         {error && <Alert variant='danger'>{error}</Alert>}
         {loading && <Loader />}
         <button className='btn font-sm'
         style={{background:'lightgrey'}}
         onClick={() => navigate(-1)}>
            Go Back 
         </button>
         <div className='w-60 m-auto'>
            <h1 className='font-xl font-500 text-dark mb-20'>UPDATE/CREATE PRODUCT</h1>
               <form onSubmit={updateProductHandler}>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Name</label>
                     <input type='text' 
                     className='w-100 p-10 font-base mt-5'
                     value={name} 
                     placeholder="Product Name"
                     onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Price</label>
                     <input type='text' 
                     className='w-100 p-10 font-base mt-5'
                     value={price} 
                     placeholder="Product Price "
                     onChange={(e) => setPrice(e.target.value)}
                     />
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Image</label>
                     <input type='text' 
                     className='w-100 p-10 font-base mt-5'
                     placeholder="Image Url"
                     value={image} 
                     onChange={(e) => setImage(e.target.value)}
                     />
                     <input type='file' onChange={uploadHandler}/> 
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Brand</label>
                     <input type='text' 
                     className='w-100 p-10 font-base mt-5'
                     placeholder="Product Brand"
                     value={brand} 
                     onChange={(e) => setBrand(e.target.value)}
                     />
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Category</label>
                     <input type='text' 
                     className='w-100 p-10 font-base mt-5'
                     placeholder="Product Category"
                     value={category} 
                     onChange={(e) => setCategory(e.target.value)}
                     />
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Stock</label>
                     <input type='text' 
                     className='w-100 p-10 font-base mt-5'
                     placeholder="Product In Stock"
                     value={countInStock} 
                     onChange={(e) => setCountInStock(e.target.value)}
                     />
                  </div>
                  <div className='mb-10'>
                     <label className='font-18 text-dark mb-5'>Description</label>
                     <textarea type='text' 
                     className='w-100 p-10 font-base mt-5'
                     placeholder="Tell something about product..."
                     value={description} 
                     onChange={(e) => setDescription(e.target.value)}
                     />
                  </div>
                  <div className='login__submitBtn mt-20'>
                     <button className='btn btn-primary' type='submit'>UPDATE</button>
                  </div>
               </form>
         </div>
      </div>
   )
}

export default NewProduct