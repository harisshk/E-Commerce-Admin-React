import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaHome ,FaSortDown,FaGripVertical,FaShoppingCart,FaTags,FaPercent,FaUserAlt,FaRegImages} from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import './navBar.css';
import { CgProfile } from "react-icons/cg";

import {Menu,MenuItem} from '@material-ui/core'
export const NavBar = (props) => {
    // console.log("----------", props.history)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const button={
        width: "50px",
        height: "50px",
        position: "relative",
        borderRadius: "100%",
        margin:"4px 0px 0px 10px",
        padding:"0"
    }
    const icon={
        position:"relative",
        margin:"0"
    }
    return (
      <div>
            <Navbar bg="primary" style={{height:"70px"}}>
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
                <FaRegImages size={20} />Banner</Button>
            </Link>
            
            <div style={{position:"absolute",right:"20px"}}>
           
            <Button style={button} variant="light" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <CgProfile style={icon} size={30}/>
        
      </Button>
      
     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          elevation={0}
    getContentAnchorEl={null}
      > 
        <MenuItem  onClick={handleClose}><Link to='/profile'>
                Profile
            </Link></MenuItem>
        <MenuItem disabled >My account</MenuItem>
        <MenuItem ><Link to='/login' onClick={()=>{
            localStorage.clear()
        }}>
                Logout
            </Link></MenuItem>
      </Menu>
            </div>
        
        </Navbar>
       
      </div>
    )
}
export default NavBar