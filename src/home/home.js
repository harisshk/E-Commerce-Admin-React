import React, { useState,useEffect } from 'react';
import NavBar from './../components/navBar'
import {Col,Row,Spinner} from 'react-bootstrap'
import { FiShoppingCart } from "react-icons/fi";
import { BiPackage } from "react-icons/bi";
import {  FaTicketAlt } from "react-icons/fa";
import {getTotalProducts,getActiveProducts} from './../services/productService'
import {getActiveOrders,getTotalOrders} from './../services/orderService'

import './home.css'
export const Home = (props) => {
    const [data,setData]= useState({
        'TotalProducts':0,
        'ActiveProducts':0,
        'ActiveOrders':0,
        'TotalOrders':0,
        'loaded':false
    })
    const[dbError,setDbError]=useState(false)
    const getValues=async()=>{
        const totalProducts = await getTotalProducts()
        const activeProducts = await getActiveProducts()
        const totalOrder = await getTotalOrders()
        const activeOrder = await getActiveOrders()
        if(totalOrder && totalProducts && activeOrder && activeProducts){
            setData({
                ...data,
                'TotalProducts':totalProducts,
                'ActiveProducts':activeProducts,
                'ActiveOrders':activeOrder,
                'TotalOrders':totalOrder,
                'loaded':true
            })
        }
        else{
            setDbError(true)
        }
    }
    useEffect(()=>{
       getValues()
     // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[props])
    return (
        <div className='body'>
            <NavBar props={props}></NavBar>
          {  data.loaded ?
            
            <div >
                
                <div className='containerBox'>
                    <Row>
                        <Col className="cardBox">
                        <div className="cardHeader">Total Orders
                            <div className='values'>
                            {data.TotalOrders}
                            </div>
                            </div>
                            <div className='iconBox'>
                            <FiShoppingCart size={60} className='icon'> </FiShoppingCart></div>    
                            </Col>
                            <Col className="cardBox">
                        <div className="cardHeader">Total Tickets
                        <div className='values'>13</div></div>
                            <div className='iconBox'>
                            <FaTicketAlt size={60} className='icon'> </FaTicketAlt></div>    
                            </Col>
                            <Col className="cardBox">
                        <div className="cardHeader">Total Products
                        <div className='values'>{data.TotalProducts}</div></div>
                            <div className='iconBox'>
                            <BiPackage size={60} className='icon'> </BiPackage></div>    
                            </Col>

                    </Row>
                </div>
                <div className='containerBox'>
                    <Row>
                    
                    <Col className="cardBox">
                        <div className="cardHeader">Active Orders
                        <div className='values'>{data.ActiveOrders}</div></div>
                            <div className='iconBox'>
                            <FiShoppingCart size={60} className='icon'> </FiShoppingCart></div>    
                            </Col>
                            <Col className="cardBox">
                        <div className="cardHeader">Active Tickets
                        <div className='values'>4</div></div>
                            <div className='iconBox'>
                            <FaTicketAlt size={60} className='icon'> </FaTicketAlt></div>    
                            </Col>
                            <Col className="cardBox">
                        <div className="cardHeader">Active Products
                        <div className='values'>{data.ActiveProducts}</div></div>
                            <div className='iconBox'>
                            <BiPackage size={60} className='icon'> </BiPackage></div>    
                            </Col>

                    </Row>
                </div>
            </div> :
            dbError ? 
            <div style={{width:'100%',height:'100px',marginTop:'300px'}} >
            
          <p style={{display:'block',marginLeft:'auto',
          marginRight:'auto',textAlign:'center'}}>Looks like Server Down!!
           <br/><a href="/home">
        Try Reloading the page
        </a></p>
         
            </div>
            :
             <div style={{width:'100%',height:'100px',marginTop:'300px'}} >
             <Spinner  style={{display:'block',marginLeft:'auto',
             marginRight:'auto',height:'50px',width:'50px'}} animation="border" variant="primary" />
             <p style={{display:'block',marginLeft:'auto',
             marginRight:'auto',textAlign:'center'}}>Loading</p>
             </div>
            }
        </div>

    )
}
export default Home