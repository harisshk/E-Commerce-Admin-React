import React from 'react';
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function ActiveOrderTab() {

  return (
    <div >
     
      <Navbar bg="light">
            <Link  to='/orders/activeOrders'>
                <Button  variant="outline-primary">
                    Total Active Orders
                </Button> 
            </Link>
            
            <Link to='/orders/paidOrders'>
                <Button variant="outline-primary">
                Paid Orders</Button>
            </Link>
            <Link to='/orders/unpaidOrders'>
                <Button variant="outline-primary" >
                Unpaid Orders</Button>
            </Link>
        </Navbar>
    </div>
  );
}
