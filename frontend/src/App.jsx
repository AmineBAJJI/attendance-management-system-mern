
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Layout from './pages/Layout'
import Users from './pages/Users'
import User from './pages/User'
import CreateUser from './pages/CreateUser'
import Products from './pages/Products'
import Product from './pages/Product'
import CreateProduct from './pages/CreateProduct'
import {useSelector} from 'react-redux'


function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/login' element={ user ? <Navigate to='/' /> :<Login/>}/>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/newuser" element={<CreateUser />} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/newproduct" element={<CreateProduct />} /> */}
      </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
