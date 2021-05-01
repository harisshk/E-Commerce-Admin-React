import React, { useState,useEffect } from 'react';
import NavBar from './../components/navBar'
import {Col,Row,Spinner} from 'react-bootstrap'
import { FiShoppingCart } from "react-icons/fi";
import { BiPackage,BiDollar } from "react-icons/bi";
import {  FaTicketAlt } from "react-icons/fa";
import {getProductsCount} from './../services/productService'
import {getOrdersCount} from './../services/orderService'
import {getDiscountCount} from './../services/discountService'

import './home.css'
export const Home = (props) => {
    const [data,setData]= useState({
        'TotalProducts':0,
        'ActiveProducts':0,
        'ActiveOrders':0,
        'TotalOrders':0,
        'DeliveredOrders':0,
        'TotalDiscount':0,
        'activeDiscount':0,
        'loaded':false
    })
    const[dbError,setDbError]=useState(false)
    const getValues=async()=>{
        const productsCount = await getProductsCount()
        const orderCount = await getOrdersCount()
        const discountCount = await getDiscountCount()
        // console.log('-----------------',orderCount)
        // console.log('=============',productsCount)
        if( !orderCount.error  && !productsCount.error && !discountCount.error){
            setData({
                ...data,
                'TotalProducts':productsCount.data.totalProductsCount,
                 'ActiveProducts':productsCount.data.activeProductsCount,
                 'ActiveOrders':orderCount.data.activeCount,
                'TotalOrders':orderCount.data.totalCount,
                'DeliveredOrders':orderCount.data.deliveredCount,
                'TotalDiscount':discountCount.data.totalCount,
                'activeDiscount':discountCount.data.activeCount,
                'loaded':true
            })
        }
        else{
            setDbError(true)
        }
        
    }
    // const View=()=>{
    //     console.log('-----',data)
    // }
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
                        <div className="cardHeader">Active Orders
                        <div className='values'>{data.ActiveOrders}</div></div>
                            <div className='iconBox'>
                            <FiShoppingCart size={60} className='icon'> </FiShoppingCart></div>    
                            </Col>
                            <Col className="cardBox">
                        <div className="cardHeader">Delivered Orders
                        <div className='values'>{data.DeliveredOrders}</div></div>
                            <div className='iconBox'>
                            <FiShoppingCart size={60} className='icon'> </FiShoppingCart></div>    
                            </Col>
                            

                    </Row>
                </div>
                <div className='containerBox'>
                    <Row>
                    <Col className="cardBox">
                        <div className="cardHeader">Total Products
                        <div className='values'>{data.TotalProducts}</div></div>
                            <div className='iconBox'>
                            <BiPackage size={60} className='icon'> </BiPackage></div>    
                            </Col>
                            <Col className="cardBox">
                        <div className="cardHeader">Active Products
                        <div className='values'>{data.ActiveProducts}</div></div>
                            <div className='iconBox'>
                            <BiPackage size={60} className='icon'> </BiPackage></div>    
                            </Col>
                            <Col className="cardBox">
                        <div className="cardHeader">Total Revenue
                        <div className='values'>1200</div></div>
                            <div className='iconBox'>
                            <BiDollar size={60} className='icon'/></div>    
                            </Col>
                    </Row>
                </div>
                <div className='containerBox'>
                    <Row>
                            <Col className="cardBox">
                        <div className="cardHeader">Total Coupons
                        <div className='values'>
                            {data.TotalDiscount}
                            </div></div>
                            <div className='iconBox'>
                            <FaTicketAlt size={60} className='icon'> </FaTicketAlt></div>    
                            </Col>
                            <Col className="cardBox">
                        <div className="cardHeader">Active Coupons
                        <div className='values'>
                            {data.activeDiscount}
                            </div></div>
                            <div className='iconBox'>
                            <FaTicketAlt size={60} className='icon'> </FaTicketAlt></div>    
                            </Col>
                            <Col className="dummycardBox">
                        {/* <div className="cardHeader">Active Products
                        <div className='values'>{data.ActiveProducts}</div></div>
                            <div className='iconBox'>
                            <BiPackage size={60} className='icon'> </BiPackage></div>     */}
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