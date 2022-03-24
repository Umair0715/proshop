import ReactStars from 'react-rating-stars-component';

const Rating = ({ value }) => {
   const options = {
      edit : false ,
      color: 'rgba(20,20,20,0.1)',
      activeColor: '#f8e825' ,
      size : window.innerWidth < 600 ? 20 : 25,
      value ,
      isHalf : true 
   }
   return (
      <ReactStars {...options} />
   )
}

export default Rating