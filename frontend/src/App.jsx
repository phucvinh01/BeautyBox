import { useEffect, useState } from 'react'
import './App.scss'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import ErrorPage from './pages/Error'
import Layout from './components/Layout'
import Product from './pages/Product'
import Admin from './pages/Admin'
import Orders from './pages/Order'

import ProductAdmin from './pages/Admin/pages/Product'
import Order from './pages/Admin/pages/Order'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Employess from './pages/Admin/pages/Employess'
import Sales from './pages/Admin/pages/Sales'
import { getBrandList, getCart, getCategoryList, getProductList } from './redux/api'
import { useDispatch, useSelector } from 'react-redux'
import About from './pages/About'
import Category from './pages/Category'
import Cart from './pages/Cart'
import { addToCartFailed, getCartFailed } from './redux/cartSlice'
import LayoutAdmin from './pages/Admin/Layout'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    if (user?.role === 1) {
      navigate('/admin/home')
    }
    if (user && user?.role !== 1) {
      getCart(user?._id, dispatch)
    }
    if (!user) {
      dispatch(getCartFailed)
    }
  }, [user])


  useEffect(() => {
    getProductList(dispatch)
    getCategoryList(dispatch)
    getBrandList(dispatch)
  }, [])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={ 5000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path='product' element={ <Product /> } />
          <Route path='category/:path' element={ <Category /> } />
          <Route path='checkout/:id' element={ <Checkout /> } />
          <Route path="profile" element={ <Profile /> } />
          <Route path="order" element={ <Orders /> } />
          <Route path="*" element={ <ErrorPage /> } />
        </Route>

        <Route path='/admin' element={ <LayoutAdmin /> }>
          <Route path='/admin/home' element={ <Admin /> } />
          <Route path='/admin/product' element={ <ProductAdmin /> } />
          <Route path='/admin/order' element={ <Order /> } />
          <Route path='/admin/employee' element={ <Employess /> } />
          <Route path='/admin/sale' element={ <Sales /> } />
        </Route>
      </Routes>

    </>
  )
}

export default App
