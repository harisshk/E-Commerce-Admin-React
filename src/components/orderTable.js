import React, { useState,useEffect } from 'react'
import Table from './table'
import dateFormat from 'dateformat';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {Button} from 'react-bootstrap'
import OrderStausModal from './orderSatatusModal'
import {updateOrderStatus} from './../services/orderService'

export const OrderTable = (props) => {
    const { orders,refresh } = props
    const onHold={
        width:"200px",
        color:"#97784A",
        textAlign:"center",
        padding:"10px",
        backgroundColor:"#F8DDA7"
    }
    const completed={
        width:"200px",
        textAlign:"center",
        padding:"10px",
        backgroundColor:"#C8D7E1"
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
    const columns=[
        {title:"Order",field:"status",
        render:rowData=>{
            return(
                <Button variant="link"  onClick={()=>{
                    props.history.replace({
                        pathname: '/order/orderDetails',
                        state: rowData
                    })
                }}>{rowData.address.name}</Button>
            )
        }    
    },
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
                            <FiberManualRecordIcon fontSize="inherit" style={{ color: 'orange' }} />Order placed</p>
                    )
                }
                else if(rowData.status === 'Cancelled'){
                    return (
                        <p className="red">
                            Order Cancelled</p>
                    )
                }
                else if(rowData.status === 'Processing'){
                    return (
                        <p className="green">
                            Order Confirmed</p>
                    )
                }
                else if(rowData.status === 'Completed'){
                    return (
                        <p style={completed}>
                            Completed</p>
                    )
                }
                else if(rowData.status === 'On Hold'){
                    return (
                        <p style={onHold}>
                            On Hold</p>
                    )
                }
            }
        },
        {title:"Total",field:"totalPrice"},
        {
            title: "Ship to", field: '',
            render: rowData => {
                return (
                    <div>
                        <p>{rowData.address.address},</p>
                        <p>{rowData.address.city}, {rowData.address.town}</p>
                        <p>{rowData.address.state}</p>
                    </div>
                )
            }
        },
        ]
    
  
    useEffect(()=>{
        
     // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[props])
    return (
        <div>

            <Table style={{ overflow: "none", margin: '15px 40px' }} title='' data={orders}
                columns={columns}
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
                            setModalShow(true)
                            setValue(rowData.status)
                            setId({
                                orderId:rowData._id,
                                userId:rowData.user._id,
                                email:rowData.user.email
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