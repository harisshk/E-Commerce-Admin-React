import React,{useEffect,useState} from 'react'
import {SpinLoader} from './../components/spinLoader'
import Snackbar from '@material-ui/core/Snackbar'
import OrderTable from './../components/orderTable'
import {getActiveOrders} from './../services/orderService'
import TabBar from './../components/tabBar'
import ActiveOrderTab from './../components/activeOrderTab'
import Reload from '../components/reload'
export const UnPaidOrders = (props)=>{
    const [orders,SetOrders] = useState(null)
    const [dbError,setDbError] = useState(false)
    const getOrders=async()=>{
        const data = await getActiveOrders()
        if(data){
            SetOrders(data.filter(item => item.status === "Processing" && item.isAmountPaid === false))
        }
        else{
            setDbError(true)
        }
    }
  
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
    }
    const refresh=()=>{
        getOrders()
    }
    useEffect(()=>{
        getOrders()
        setDbError(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[props])

    return(
        <div><TabBar/>
        <ActiveOrderTab />
            {orders ?
        <div>         
            <OrderTable {...props} orders={orders} refresh={()=>refresh()}/>
    <Snackbar open={snackBarOpen} message="Successfully Deleted" 
    autoHideDuration={3500} onClose={handleCloseSnack}>

</Snackbar>
            </div>   :
    dbError ? 
    <Reload href="/orders/unpaidOrders" />
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
export default UnPaidOrders