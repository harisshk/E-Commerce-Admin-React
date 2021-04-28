
import './App.css';
import  LoginPage  from './auth/login';
import {Route,BrowserRouter} from 'react-router-dom'
import Home from './home/home';
import { Product } from './products/product';
import ProductForm from './products/productForm';
import VariantForm from './products/variantForm';
import orderList from './orders/orderList'
import {TagList} from './tag/tagList'
import ActionPendingOrders from './orders/unConfirmedOrders'
import PaidOrders from './orders/paidOrders'
import UnPaidOrders from './orders/unPaidOrders'
// import { useState } from 'react';
import SubCategoryForm from './category/subCategory/subCategoryForm'
import CategoryList from './category/categoryList';
import CancelledOrders from './orders/cancelledOrders'
import ActiveOrders from './orders/activeOrders'
import DeliveredOrders from './orders/deliveredOders'
function App() {
  // const [isLogin,setIsLogin] = useState(false)
  // const login =()=>{
  //   setIsLogin(true)
  // }
  return (
    <BrowserRouter>
    
    <Route path='/category/addSubCategory' component={SubCategoryForm} />
    <Route  path='/login' component={()=><LoginPage   />} />
    <Route exact path='/' component={Home} />
    <Route exact path='/product' component={Product} />
    <Route exact path='/orders/totalOrders' component={orderList} />
    <Route exact path='/orders/activeOrders' component={ActiveOrders} />
    <Route exact path='/orders/paidOrders' component={PaidOrders} />
    <Route exact path='/orders/unpaidOrders' component={UnPaidOrders} />
    <Route exact path='/orders/actionPendingOrders' component={ActionPendingOrders} />
    <Route exact path='/category' component={CategoryList} />
    <Route exact path='/orders/cancelledOrders' component={CancelledOrders} />
    <Route exact path='/orders/deliveredOrders' component={DeliveredOrders} />
    <Route exact path='/product/add' component={ProductForm} />
    <Route exact path='/tags' component={TagList} />
    <Route  path='/product/add' component={VariantForm} />
    </BrowserRouter>
  );
}

export default App;
