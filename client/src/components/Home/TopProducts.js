import './Home.css';
import { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getTopProducts } from './../../actions/productAction';
import Alert from  './../alert/Alert';
import Loader from './../loader/Loader'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import 'swiper/swiper.min.css'
// import 'swiper/modules/pagination/pagination.min.css'
// import 'swiper/modules/navigate/navigation.min.css'
import "swiper/swiper-bundle.min.css";

import { Autoplay, Pagination, Navigation } from "swiper";


const TopProducts = () => {
   const dispatch = useDispatch();
   const { products , loading , error } = useSelector(state => state.topProducts);

   useEffect(() => {
      dispatch(getTopProducts())
   }, [dispatch])

   return (
      loading ? <Loader />
      : error ? <Alert variant='danger'>{error}</Alert>
      : products && 
            <Swiper
               spaceBetween={30}
               centeredSlides={true}
               loop={true}
               autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
               }}
               pagination={{
                  clickable: true,
               }}
               navigation={true}
               modules={[Autoplay, Pagination, Navigation]}
               className="mySwiper"
               >
               {
                   products && products.length > 0 && 
                     products.map(product => (
                        <SwiperSlide>
                           <Link to={`/product/${product._id}`} key={product._id}>
                              <img src={product.image} alt={product.name}></img>
                              <h2 
                              className='font-lg text-white font-500 mt-10'>
                                 {product.name}
                              </h2>
                           </Link>
                        </SwiperSlide>
               
                     ))
} 
            </Swiper>
      
   )
}

export default TopProducts