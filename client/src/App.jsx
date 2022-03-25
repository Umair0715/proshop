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
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import OrderDetails from './pages/OrderDetails';
import UsersList from './pages/UsersList';
import UserUpdate from './pages/UserUpdate';
import AdminProductList from './pages/AdminProductList';
import NewProduct from './pages/NewProduct';
import AdminOrdersList from './pages/AdminOrdersList';
import AdminOrderDetails from './pages/AdminOrderDetails';

const App = () => {
 
   const { userInfo } = useSelector(state => state.login);

   return (
      <>
         <Router>
            <Nav />
            <main className=' w-85 m-auto min-h-100 '>
                  <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/search/:keyword' element={<Home />} />
                     <Route path='/search/:keyword/page/:pageNumber' element={<Home />} />
                     <Route path='/page/:pageNumber' element={<Home />} />

                     <Route path='/product/:id' element={<SingleProduct />} />
                     <Route path='/cart/:id' element={<Cart />} />
                     <Route path='/cart' element={<Cart />} />
                     <Route path='/login' element=
                     { userInfo ? <Navigate to='/' /> :  <Login />} />
                     <Route path='/register' element=
                     { userInfo ? <Navigate to='/' /> : <Register />} />
                     <Route path='/profile' element=
                     {userInfo ? <Profile /> : <Navigate to='/login' />} />
                     <Route 
                     path='/order/shipping' 
                     element={userInfo ? <Shipping /> : <Navigate to='/login' />} />
                     <Route 
                     path='/order/payment' 
                     element={userInfo ? <Payment /> : <Navigate to='/login' />} />
                     <Route 
                     path='/order/place' 
                     element={userInfo ? <PlaceOrder /> : <Navigate to='/login' />} />
                     <Route path='/order/:id'
                     element={userInfo ? <OrderDetails /> : <Navigate to='/login' />} />
                     <Route path='/admin/usersList'
                     element={userInfo && userInfo.isAdmin ? <UsersList /> : <Navigate to='/' />} />
                     <Route path='/admin/user/update/:id'
                     element={userInfo && userInfo.isAdmin ? <UserUpdate /> : <Navigate to='/' />} />
                     <Route path='/admin/products'
                     element={userInfo && userInfo.isAdmin ? <AdminProductList /> : <Navigate to='/' />} />
                      <Route path='/admin/products/:pageNumber'
                     element={userInfo && userInfo.isAdmin ? <AdminProductList /> : <Navigate to='/' />} />
                     <Route path='/admin/product/update/:id'
                     element={userInfo && userInfo.isAdmin ? <NewProduct /> : <Navigate to='/' />} />
                     <Route path='/admin/orders'
                     element={userInfo && userInfo.isAdmin ? <AdminOrdersList /> : <Navigate to='/' />} />
                      <Route path='/admin/order/:id'
                     element={userInfo && userInfo.isAdmin ? <AdminOrderDetails /> : <Navigate to='/' />} />
                  </Routes>
            </main>
            <Footer />
         </Router>
      </>
   )
};

export default App;