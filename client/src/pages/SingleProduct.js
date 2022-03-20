import { useEffect } from 'react'
import ProductDetail from '../components/singleProduct/ProductDetail';
import { useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { getSingleProduct } from './../actions/productAction';
import Loader from './../components/loader/Loader';
import Alert from './../components/alert/Alert';


const SingleProduct = () => {
   const { id } = useParams();
   const { loading , error , product } = useSelector(state => state.product);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getSingleProduct(id));
   }, [dispatch])

   return (
      loading ? <Loader />
      : error ? <Alert variant='danger'>{error}</Alert>
      : product && 
      <div className='singleProduct__wrapper py-30'>
          <ProductDetail product={product}/>
      </div>
   )
   
}

export default SingleProduct