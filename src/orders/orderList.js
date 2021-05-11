import React,{useEffect, useState} from 'react'
import {getAllOrders} from '../services/orderService'
import { SpinLoader} from './../components/spinLoader'
import Snackbar from '@material-ui/core/Snackbar'
import OrderTable from './../components/orderTable'
import './orderList.css'
import {Button} from 'react-bootstrap'
import TabBar from '../components/tabBar'
import dateFormat from 'dateformat';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


export const OrderList=(props)=>{
    const [orders,SetOrders] = useState(null)
    const [dbError,setDbError] = useState(false)
    const getOrders=async()=>{
        const data = await getAllOrders()
        // console.log("orders----------",data)
        if(data){
            SetOrders(data)
        }
        else{
            setDbError(true)
        }
    }

    const refresh=()=>{
        getOrders()
    }
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
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
                            <FiberManualRecordIcon fontSize="inherit" style={{ color: 'green' }} />Order placed</p>
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
        const options = {
            actionsColumnIndex: -1,
            showFirstLastPageButtons: false,
            emptyRowsWhenPaging: false,
    
        }
    const actions={}
    useEffect(()=>{
        getOrders()
        setDbError(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[])

    return(
        <div>
            <TabBar/>
            {orders ?
        <div>
            <OrderTable {...props}  orders={orders} options={options} refresh={()=>refresh()} />
    <Snackbar open={snackBarOpen} message="Successfully Deleted" 
    autoHideDuration={3500} onClose={handleCloseSnack}>
</Snackbar>
            </div>   :
    dbError ? 
    <div style={{width:'100%',height:'100px',marginTop:'300px'}} >
    
    <p style={{display:'block',marginLeft:'auto',
    marginRight:'auto',textAlign:'center'}}>Looks like Server Down!!
    <br/><a href="/orders">
    Try Reloading the page
    </a></p>
    </div>
    :
    <div style={{width:'100%',height:'100px',marginTop:'300px'}} >
    <SpinLoader />
    <p style={{display:'block',marginLeft:'auto',
    marginRight:'auto',textAlign:'center'}}>Loading</p>
    </div>
            
        }
        </div>
    )
}
export default OrderList