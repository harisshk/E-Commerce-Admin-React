
import './App.css';
import  LoginPage  from './auth/login';
import {Route,BrowserRouter} from 'react-router-dom'
import Home from './home/home';
import { Product } from './products/product';
import ProductForm from './products/productForm';
import VariantForm from './products/variantForm';
import orderList from './orders/orderList'
import {TagList} from './tag/tagList'
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
    <Route exact path='/totalOrders' component={orderList} />
    <Route exact path='/activeOrders' component={ActiveOrders} />
    <Route exact path='/category' component={CategoryList} />
    <Route exact path='/cancelledOrders' component={CancelledOrders} />
    <Route exact path='/deliveredOrders' component={DeliveredOrders} />
    <Route exact path='/product/add' component={ProductForm} />
    <Route exact path='/tags' component={TagList} />
    <Route  path='/product/add' component={VariantForm} />
    </BrowserRouter>
  );
}

export default App;
