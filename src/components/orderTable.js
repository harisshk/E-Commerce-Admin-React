import React, { useState,useEffect } from 'react'
import Table from './table'
import dateFormat from 'dateformat';
import { GiMoneyStack } from "react-icons/gi";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { FiTruck } from "react-icons/fi";
import {Row,Col} from 'react-bootstrap'
import { BiMessageError, BiMessageAltCheck } from "react-icons/bi";
import OrderStausModal from './orderSatatusModal'
import {updateOrderStatus} from './../services/orderService'

export const OrderTable = (props) => {
    const { orders,refresh,cancelled } = props
    const amount={
        marginTop:"5px"
    }
    const [modalShow,setModalShow]=useState(false)
    const [value,setValue]=useState('')
    const [isDeliverd,setIsDelivered]=useState(null)
    const [Id,setId]=useState({})
    const onHide=()=>{
        setModalShow(false)
    }
    const onUpdate=async(status)=>{
        const data =updateOrderStatus(status,Id)
        if(data){
            setModalShow(false)
            setTimeout(() => {
                refresh()
            }, 1500);
            
        }
    }
    const columns = [
        { title: "Order Number", field: 'name' },
        { title: "Customer Name", field: 'address.name' },
        {
            title: "Order Created", field: 'createdAt',
            render: rowData => {
                return (
                    <div>
                        <p>{dateFormat(rowData.createdAt, "mmmm dS, yyyy ")}</p>
                        <p style={{ color: '#4a4a48' }}>{dateFormat(rowData.createdAt, "hh:mm")}</p>
                    </div>
                )
            }
        },
        {
            title: "Order Updated", field: 'updatedAt',
            render: rowData => {
                return (
                    <div>
                        <p>{dateFormat(rowData.updatedAt, "mmmm dS, yyyy ")}</p>
                        <p style={{ color: '#4a4a48' }}>{dateFormat(rowData.updatedAt, "hh:mm   ")}</p>
                    </div>
                )
            }
        },
        {
            title: "Order Status", field: 'status',
            render: rowData => {
                if (rowData.status === 'Order Placed') {
                    return (
                        <p  >
                            <FiberManualRecordIcon fontSize="inherit" style={{ color: 'green' }} />Order placed</p>
                    )
                }
                else if(rowData.status === 'Cancelled Order'){
                    return (
                        <p className="red">
                            Order Cancelled</p>
                    )
                }
                else if(rowData.status === 'Order Confirmed'){
                    return (
                        <p className="green">
                            Order Confirmed</p>
                    )
                }
            }
        },
        {
            title: "Payment Type", field: 'paymentType',
            render: rowData => {
                if (rowData.paymentType === 'COD') {
                    return (
                        <p><GiMoneyStack size={30} />COD</p>
                    )
                }
                else if ((rowData.paymentType === 'UPI')) {
                    return (
                        <p>UPI</p>
                    )
                }
                else if ((rowData.paymentType === 'Card')) {
                    return (
                        <p><CreditCardIcon size={30}/>Card</p>
                    )
                }
                
            }
        },
        {
            title: "Delivery Status", field: 'isDelivered',
            render: rowData => {
                if (rowData.isDelivered) {
                    return (
                        <p className="green">
                            Delivered</p>
                    )
                }
                else if(rowData.status==="Order Confirmed"){
                    return (
                        <p  ><FiberManualRecordIcon fontSize="inherit" style={{ color: 'yellow' }} /><FiTruck color={'black'} size={20}></FiTruck>
                on Progress</p>
                    )
                }
                else{
                    return(<p>Order not Confirmed</p>)
                }
            }
        },
        {
            title: "Message Status", field: 'pushStatus',
            render: rowData => {
                if (rowData.pushStatus) {
                    return (
                        <p className="green"><BiMessageAltCheck size={30}></BiMessageAltCheck>
                    Delivered</p>
                    )
                }
                else {
                    return (
                        <p className="danger"><BiMessageError size={30}></BiMessageError>
                Not send</p>
                    )
                }
            }
        },
        // {
        //     title: "Is Active", field: 'isActive',
        //     render: rowData => {
        //         if (rowData.isActive) {
        //             return (<p style={{ color: 'green', fontWeight: "bolder" }}>Active</p>)
        //         }
        //         else {
        //             return (<p style={{ color: 'red', fontWeight: "bolder" }}>InActive</p>)
        //         }
        //     }
        // },
    ]
    const cancelledColumn = [
        { title: "Order Number", field: 'name' },
        { title: "Customer Name", field: 'address.name' },
        {
            title: "Order Created", field: 'createdAt',
            render: rowData => {
                return (
                    <div>
                        <p>{dateFormat(rowData.createdAt, "mmmm dS, yyyy ")}</p>
                        <p style={{ color: '#4a4a48' }}>{dateFormat(rowData.createdAt, "hh:mm")}</p>
                    </div>
                )
            }
        },
        {
            title: "Order Updated", field: 'updatedAt',
            render: rowData => {
                return (
                    <div>
                        <p>{dateFormat(rowData.updatedAt, "mmmm dS, yyyy ")}</p>
                        <p style={{ color: '#4a4a48' }}>{dateFormat(rowData.updatedAt, "hh:mm:ss")}</p>
                    </div>
                )
            }
        },
        {
            title: "Order Status", field: 'status',
            render: rowData => {
                if (rowData.status === 'Order Placed') {
                    return (
                        <p  >
                            <FiberManualRecordIcon fontSize="inherit" style={{ color: 'green' }} />Order placed</p>
                    )
                }
                else if(rowData.status === 'Cancelled Order'){
                    return (
                        <p className="red">
                            Order Cancelled</p>
                    )
                }
                else if(rowData.status === 'Order Confirmed'){
                    return (
                        <p className="green">
                            Order Confirmed</p>
                    )
                }
            }
        },
        { title: "Cancellation Reason", field: 'cancellationReason' },
        {
            title: "Payment Type", field: 'paymentType',
            render: rowData => {
                if (rowData.paymentType === 'COD') {
                    return (
                        <p><GiMoneyStack size={30} />COD</p>
                    )
                }
                else if ((rowData.paymentType === 'UPI')) {
                    return (
                        <p>UPI</p>
                    )
                }
                else if ((rowData.paymentType === 'Card')) {
                    return (
                        <p><CreditCardIcon size={30}/>Card</p>
                    )
                }
                
            }
        },
        
        ]
    const tableColumn=()=>{
        if(cancelled){
            return cancelledColumn
        }
        else{
            return columns
        }
    }
    const subcolumn = [{ title: "Products", field: 'product.name' },
    { title: "Quantity", field: 'quantity' },
    { title: "Price", field: 'product.price' },
    ]
    useEffect(()=>{
        
     // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[props])
    return (
        <div>

            <Table style={{ overflow: "none", margin: '15px 40px' }} title='' data={orders}
                columns={tableColumn()}
                detailPanel={[
                    {
                        icon: 'expand_more',
                        tooltip: 'Show Details',
                        onRowClick: async (event, rowData) => {
                            console.log(rowData)
                        },
                        render: rowData => {
                            return (
                                <div>
                                <div style={amount}>
                                    <Row><Col> <Table style={{ border: "3px solid #067BFD" ,width:"800px"}} title='Sub Category' columns={subcolumn} data={rowData.products}
                                        options={{
                                            search: false,
                                            toolbar: false,
                                            paging: false,
                                            actionsColumnIndex: -1,
                                            emptyRowsWhenPaging:false,
                                            

                                        }}
                                    ></Table></Col>
                                      <Col>
                                      <Row style={{marginLeft:"30px"}}><h4>Amount</h4></Row>
                                      <Row style={amount}>
                                       <Col>Total amount :</Col>
                                        <Col>{rowData.totalPrice}</Col>
                                       </Row>
                                       <Row style={amount}>
                                       <Col>Tax :</Col>
                                        <Col>{rowData.tax}</Col>
                                       </Row>
                                       <Row style={amount}>
                                       <Col>Discount :</Col>
                                        <Col>{rowData.discountPrice}</Col>
                                       </Row>
                                       <Row style={amount}>
                                       <Col>Cash Back :</Col>
                                        <Col>{rowData.cashBackPrice}</Col>
                                       </Row>
                                       <Row>    </Row>
                                       <Row style={amount}>
                                       <Col>Total Invoice Amount :</Col>
                                        <Col>{rowData.totalPrice}</Col>
                                       </Row>
                                      </Col>
                                      <Col>
                                      <Row style={{marginLeft:"30px"}}><h4>Delivery Details</h4></Row>
                                      <Row style={amount}>
                                       <Col>Name :{rowData.address.name}</Col>
                                       </Row>
                                       <Row style={amount}>
                                       <Col> {rowData.address.address},</Col>
                                       </Row>
                                       <Row >
                                       <Col> {rowData.address.town},</Col>
                                       </Row>
                                       <Row >
                                       <Col> {rowData.address.city},</Col>
                                       </Row>
                                       <Row >
                                       <Col> {rowData.address.state} - {rowData.address.pinCode}</Col>
                                       </Row>
                                       <Row style={amount}>
                                       <Col>Phone Number :{rowData.address.phoneNumber}</Col>
                                       </Row>
                                      </Col>
                                    </Row>
                                    </div>
                                </div>)
                        }
                    }]}
                options={{
                    actionsColumnIndex: -1,
                    showFirstLastPageButtons: false,
                    pageSizeOptions: [5, 10, 20, 50],
                    detailPanelColumnAlignment: 'right',
                    detailPanelColumnStyle: { width: '100px' },
                    emptyRowsWhenPaging:false,

                }}
                actions={[
                    rowData=>({
                        disabled:rowData.isCancelled,
                        icon: 'settings',
                        tooltip: 'change status',
                        onClick: async (event, rowData) => {
                            console.log(rowData)
                            setModalShow(true)
                            setValue(rowData.status)
                            setId({
                                orderId:rowData._id,
                                userId:rowData.user._id
                            })
                            setIsDelivered(rowData.isDelivered)
                        },
                    })
                ]}
            >
            </Table>
            <OrderStausModal onUpdate={(value)=>{onUpdate(value)}} onHide={()=>onHide()} show={modalShow} isDelivered={isDeliverd} value={value}/>
        </div>
    )
}
export default OrderTable