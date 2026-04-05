
import './App.css'
import Home from './assets/pages/Home';
import {BrowserRouter, Routes, Route} from "react-router"
// import AdminCategory from './dashboard/adminCategory';
// import AdminPage from './dashboard/adminPage';
// import AdminLogin from './dashboard/adminLogin';
// import AdminProducts from './dashboard/adminProducts';
// import AdminSetting from './dashboard/adminSetting';
// import AllOrders from './dashboard/AllOrders';

import AdminCategory from './dashboard/AdminCategory';
import AdminPage from './dashboard/AdminPage';
import AdminLogin from './dashboard/AdminLogin';
import AdminProducts from './dashboard/AdminProducts';
import AdminSetting from './dashboard/AdminSetting';
import AllOrders from './dashboard/AllOrders';

 
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path="/adminlogin" element = {<AdminLogin/>}/>
        
         <Route path='/adminpage' element={<AdminPage />}>
         <Route path='admincategory' element={<AdminCategory />} />
         <Route path='adminproducts' element={<AdminProducts />} />
         <Route path='adminsetting' element={<AdminSetting />} />
         <Route path='allorders' element={<AllOrders />} />
         </Route>
        
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
