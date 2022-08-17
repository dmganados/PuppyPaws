import { useState, useEffect } from 'react';
import AppNavBar from './components/AppNavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Register from './pages/Register';
import Login from './pages/Login';
import ManageProduct from './pages/ManageProduct';
import CreateProduct from './components/CreateProduct';
import Edit from './pages/Edit';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import { UserProvider } from './UserContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';
function App() {

  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  });

  useEffect(() => {
    let token = localStorage.getItem('accessToken');
    fetch('https://limitless-brushlands-90925.herokuapp.com/users/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json()).then(convertedData => {
      // console.log(convertedData)

      if (typeof convertedData._id !== "undefined") {
        setUser({
          id: convertedData._id,
          isAdmin: convertedData.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    });
  },[user])


  return (
    
      <UserProvider value={{user, setUser}} >
      <Router>        
        <AppNavBar />
          <Routes>          
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/manage-product' element={<ManageProduct />} />
            <Route path='/create-product' element={<CreateProduct />} />
            <Route path='/manage-product/update-product/:id' element={<Edit />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />           
            <Route path='/products/:id' element={<ProductInfo />} />
            <Route path='/my-orders' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        <Footer />
      </Router>
      </UserProvider>
  );
};

export default App;
