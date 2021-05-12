import React,{useEffect, useState} from 'react'
import {getAllOrders} from '../services/orderService'
import { SpinLoader} from './../components/spinLoader'
import Snackbar from '@material-ui/core/Snackbar'
import OrderTable from './../components/orderTable'
import './orderList.css'
import TabBar from '../components/tabBar'


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
    
        const options = {
            actionsColumnIndex: -1,
            showFirstLastPageButtons: false,
            emptyRowsWhenPaging: false,
    
        }
    
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