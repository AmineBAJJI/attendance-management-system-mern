
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Layout from './pages/Layout'
import Users from './pages/Users'
import User from './pages/User'
import CreateUser from './pages/CreateUser'
import StudentAbs from './pages/StudentAbs';
import CreateSession from './pages/CreateSession';
import JusifieAbs from './pages/JustifieAbs';

import UsersFiled from './pages/UsersFiled';
import {ToastContainer} from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import 'react-toastify/dist/ReactToastify.css'


function App() {

  return (
    <BrowserRouter>
    <ToastContainer />
     <Routes>
      <Route path='/login' element={ <Login/>}/>
      <Route path='' element={<PrivateRoute/>}>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/jusifieabs" element={<JusifieAbs />} />
        <Route path="/user/:userId/class/:classId/element/:elementId" element={<User />} />
        <Route path="/student/:studentId/class/:classId" element={<StudentAbs/>} />
        <Route path="/newuser" element={<CreateUser />} />
        <Route path="/usersfiled" element={<UsersFiled/>} />
        <Route path="/newsession" element={<CreateSession/>} />
        {/* <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/newproduct" element={<CreateProduct />} /> */}
      </Route>
      </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
