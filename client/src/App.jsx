import './App.css'
import Nav from './components/layouts/Nav';
import Footer from './components/layouts/Footer';
import Home from './pages/Home';
import { BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import  { useSelector } from 'react-redux';
import Profile from './pages/Profile';

const App = () => {
 
   const { userInfo } = useSelector(state => state.login);

   return (
      <>
         <Router>
            <Nav />
            <main className=' w-85 m-auto min-h-100 '>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/product/:id' element={<SingleProduct />} />
                     <Route path='/cart/:id' element={<Cart />} />
                     <Route path='/cart' element={<Cart />} />
                     <Route path='/login' element=
                     { userInfo ? <Navigate to='/' /> :  <Login />} />
                     <Route path='/register' element=
                     { userInfo ? <Navigate to='/' /> : <Register />} />
                     <Route path='/profile' element=
                     {userInfo ? <Profile /> : <Navigate to='/login' />} />
                  </Routes>
            </main>
            <Footer />
         </Router>
      </>
   )
};

export default App;