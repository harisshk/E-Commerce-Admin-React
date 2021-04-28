import React, { useState,useEffect } from 'react'
import Table from './table'
import dateFormat from 'dateformat';
import { GiMoneyStack } from "react-icons/gi";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { FiTruck } from "react-icons/fi";
import { BiMessageError, BiMessageAltCheck } from "react-icons/bi";
import OrderStausModal from './orderSatatusModal'
import {updateOrderStatus} from './../services/orderService'

export const OrderTable = (props) => {
    const { orders,refresh } = props
    console.log(props)
    const [modalShow,setModalShow]=useState(false)
    const [value,setValue]=useState('')
    const [isDeliverd,setIsDelivered]=useState(null)
    const [orderId,setOrderId]=useState('')
    const onHide=()=>{
        setModalShow(false)
    }
    const onUpdate=async(status)=>{
        const data =updateOrderStatus(status,orderId)
        if(data){
            setModalShow(false)
            refresh()
            refresh()
        }
    }
    const columns = [
        { title: "Order Number", field: 'name' },
        // { title: "Customer Name", field: 'address.name' },
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
                        <p style={{ color: '#4a4a48' }}>{dateFormat(rowData.updatedAt, "hh:mm")}</p>
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
                else {
                    return (
                        <p  ><FiTruck color={'black'} size={20}></FiTruck>
                on Progress</p>
                    )
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
                columns={columns}
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
                                    <Table style={{ border: "3px solid #067BFD" }} title='Sub Category' columns={subcolumn} data={rowData.products}
                                        options={{
                                            search: false,
                                            toolbar: false,
                                            paging: false,
                                            actionsColumnIndex: -1
                                        }}
                                    ></Table>
                                    <div className="amount">
                                        <p>Total Amount:{rowData.totalPrice}</p>
                                        <p>Discount Amount:{rowData.discountPrice}</p>
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
                            setOrderId(rowData._id)
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