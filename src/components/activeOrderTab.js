import React from 'react';
import NavBar from './navBar'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function TActiveOrderTab() {

  return (
    <div >
      <NavBar></NavBar>
      <Navbar bg="light">
            <Link  to='/totalOrders'>
                <Button variant="primary">
                    Total Orders
                </Button> 
            </Link>
            <Link to='/activeOrders'> 
                <Button variant="primary" >Active Orders</Button>
            </Link>
            <Link to='/cancelledOrders'>
                <Button variant="primary">
                Cancelled Orders</Button>
            </Link>
            <Link to='/deliveredOrders'>
                <Button variant="primary" >
                Delivered Orders</Button>
            </Link>
        </Navbar>
    </div>
  );
}
