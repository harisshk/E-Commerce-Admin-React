import React from 'react';
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from '../components/navBar'
export default function TabBar(props) {

  return (
    <div >
      <NavBar  {...props}/>
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
