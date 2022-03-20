import './App.css'
import Nav from './components/layouts/Nav';
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';

const App = () => {
   return (
      <>
         <Router>
            <Nav />
            <main className=' w-85 m-auto min-h-100 '>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/product/:id' element={<SingleProduct />} />
                     <Route path='/cart' element={<Cart />} />
                  </Routes>
            </main>
            <Footer />
         </Router>
      </>
   )
};

export default App;