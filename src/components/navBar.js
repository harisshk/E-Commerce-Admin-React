import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaHome ,FaGripVertical,FaShoppingCart,FaTags,FaPercent,FaUserAlt} from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import './navBar.css';
import { GrLogout } from "react-icons/gr";

export const NavBar = (props) => {
    // console.log("----------", props.history)
    return (
      <div>
            <Navbar bg="primary">
            <Link  to='/home'>
                <Button variant="primary">
                    <FaHome size={30} color='white'></FaHome>
                </Button> 
            </Link>
            <Link to='/product'> 
                <Button variant="primary">
                <BiPackage size={30} color='white'></BiPackage>Products</Button>
            </Link>
            <Link to='/category'>
                <Button variant="primary">
                <FaGripVertical size={30} color='white'></FaGripVertical>Category</Button>
            </Link>
            <Link to='/orders/totalOrders'>
                <Button variant="primary" >
                <FaShoppingCart size={30} color='white'></FaShoppingCart>Orders</Button>
            </Link>
            <Link to='/tags'>
                <Button variant="primary" >
                <FaTags size={30} color='white'></FaTags>Tags</Button>
            </Link>
            <Link to='/discount'>
                <Button variant="primary" >
                <FaPercent size={20} color='white'/>Discount</Button>
            </Link>
            <Link to='/users'>
                <Button variant="primary" >
                <FaUserAlt size={20} color='white'/>Users</Button>
            </Link>
            <Link to='/tax'>
                <Button variant="primary" >
                <FaPercent size={20} color='white'/>Tax</Button>
            </Link>
            <Link to='/banner'>
                <Button variant="primary" >
                Banner</Button>
            </Link>
            <div style={{position:"relative",marginLeft:"auto"}}>
            <Link to='/banner'>
                <Button variant="primary" >
                <GrLogout size={20} color=''/>Logout</Button>
            </Link>
            </div>
        </Navbar>
       
      </div>
    )
}
export default NavBar