import { Link } from 'react-router-dom'
import './Paginate.css';


const Paginate = ({ page , pages , keyword ="" , isAdmin=false}) => {
   return (
      pages > 1 &&
         <div className='font-base text-dark flex items-center mt-30 justify-center pagination'>
            {
               [...Array(pages).keys()].map(x => {
                  return <Link key={x+1}
                  className={ x+1 === page ? 'active' : ''}
                  to={
                     !isAdmin ? 
                        keyword ? `/search/${keyword}/page/${x+1}` 
                        : `/page/${x+1}`
                     : `/admin/products/${x+1}` 
                  }>
                     <span>{ x + 1 }</span> 
                  </Link>
               })
            }
         </div>
   )
}

export default Paginate