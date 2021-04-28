import React from 'react';
import NavBar from './navBar'
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function TabBar() {

  return (
    <div >
      <NavBar></NavBar>
      <Navbar bg="light">
            <Link  to='/orders/totalOrders'>
                <Button variant="primary">
                    Total Orders
                </Button> 
            </Link>
            
            <Link to='/orders/actionPendingOrders'> 
                <Button variant="primary" >UnConfirmed Orders</Button>
            </Link>
            <Link to='/orders/activeOrders'> 
                <Button variant="primary" >Active Orders</Button>
            </Link>
            <Link to='/orders/cancelledOrders'>
                <Button variant="primary">
                Cancelled Orders</Button>
            </Link>
            <Link to='/orders/deliveredOrders'>
                <Button variant="primary" >
                Delivered Orders</Button>
            </Link>
        </Navbar>
    </div>
  );
}
