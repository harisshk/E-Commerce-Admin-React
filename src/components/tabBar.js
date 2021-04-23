import React from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import NavBar from './navBar'
import OrderList from './../orders/orderList'
export default function TabBar() {
  return (
    <div >
      <NavBar></NavBar>
      <Tabs variant="pills" active defaultActiveKey="totalOrders" id="uncontrolled-tab-example">
  <Tab eventKey="totalOrders" title="Total Orders">
    <OrderList></OrderList>
  </Tab>
  <Tab eventKey="activeOrders" title="Active Orders">
    null
  </Tab>
  <Tab eventKey="deliveredOrders" title="Delivered Orders" >
    null
    
  </Tab>
</Tabs>
    </div>
  );
}
