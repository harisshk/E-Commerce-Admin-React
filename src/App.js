
import './App.css';
import  LoginPage  from './auth/login';
import {Route,BrowserRouter} from 'react-router-dom'
import Home from './home/home';
import { Product } from './products/product';
import ProductForm from './products/productForm';
import VariantForm from './products/variantForm'
function App() {
  return (
    <BrowserRouter>
    <Route path='/login' component={LoginPage} />
    <Route path='/home' component={Home} />
    <Route exact path='/product' component={Product} />
    <Route exact path='/product/add' component={ProductForm} />
    <Route  path='/product/add' component={VariantForm} />
    </BrowserRouter>
  );
}

export default App;
