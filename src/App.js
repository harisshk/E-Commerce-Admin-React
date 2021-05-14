
import './App.css';
import  LoginPage  from './auth/login';
import {Route,BrowserRouter, Redirect, Switch} from 'react-router-dom'
import Home from './home/home';
import { Product } from './products/product';
import ProductForm from './products/productForm';
import VariantForm from './products/variantForm';
import orderList from './orders/orderList'
import {TagList} from './tag/tagList'
import ActionPendingOrders from './orders/unConfirmedOrders'
import PaidOrders from './orders/paidOrders'
import UserList from './users/userList'
import UnPaidOrders from './orders/unPaidOrders'
import DiscountForm from './discounts/discountForm'
import SubCategoryForm from './category/subCategory/subCategoryForm'
import CategoryList from './category/categoryList';
import CancelledOrders from './orders/cancelledOrders'
import ActiveOrders from './orders/activeOrders'
import DeliveredOrders from './orders/deliveredOders';
import DiscountList from './discounts/discountList';
import UserForm from './users/userForm'
import TaxList from './tax/taxList'
import OrderDetails from './orders/orderDetails'
import BannerList from './banner/bannerList'
import BannerForm from './banner/bannerForm'

const authentication={
  isLoggedIn:localStorage.getItem('token'),
  getLoginStatus(){
    if(this.isLoggedIn!==''){
      return  true
    }
    else{
      return false
    }
  }
  
}
function SecuredRoute(props){
  return(
    <Route path={props.path} render={(data)=>authentication.getLoginStatus()?
    <props.component {...data}></props.component>:
    <Redirect to={{pathname:'/'}}></Redirect>
    }></Route>
  )
}
function App() {
  // const [isLogin,setIsLogin] = useState(false)
  // const login =()=>{
  //   setIsLogin(true)
  // }
  return (
    <BrowserRouter>
    <Switch>
    <Redirect exact from='/' to='/login' component={LoginPage} />
    <SecuredRoute path='/category/addSubCategory' component={SubCategoryForm} />
    <Route  path='/login' component={LoginPage} />
    <SecuredRoute exact path='/home' component={Home} />
    <SecuredRoute exact path='/users' component={UserList} />
    <SecuredRoute exact path='/users/add' component={UserForm} />
    <SecuredRoute exact path='/product' component={Product} />
    <SecuredRoute exact path='/discount' component={DiscountList} />
    <SecuredRoute exact path='/discount/add' component={DiscountForm} />
    <SecuredRoute exact path='/orders/totalOrders' component={orderList} />
    <SecuredRoute exact path='/orders/activeOrders' component={ActiveOrders} />
    <SecuredRoute exact path='/orders/paidOrders' component={PaidOrders} />
    <SecuredRoute exact path='/orders/unpaidOrders' component={UnPaidOrders} />
    <SecuredRoute exact path='/orders/actionPendingOrders' component={ActionPendingOrders} />
    <SecuredRoute exact path='/category' component={CategoryList} />
    <SecuredRoute exact path='/orders/cancelledOrders' component={CancelledOrders} />
    <SecuredRoute exact path='/orders/deliveredOrders' component={DeliveredOrders} />
    <SecuredRoute exact path='/product/add' component={ProductForm} />
    <SecuredRoute exact path='/tags' component={TagList} />
    <SecuredRoute exact path='/product/add' component={VariantForm} />
    <SecuredRoute exact path='/tax' component={TaxList} />
    <SecuredRoute exact path='/order/orderDetails' component={OrderDetails} />
    <SecuredRoute exact path='/banner' component={BannerList} />
    <SecuredRoute exact path='/banner/add' component={BannerForm} />

    </Switch>
    </BrowserRouter>
  );
}

export default App;
