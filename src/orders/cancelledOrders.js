import React,{useEffect,useState} from 'react'
import {SpinLoader} from './../components/spinLoader'
import Snackbar from '@material-ui/core/Snackbar'
import OrderTable from './../components/orderTable'
import {getCancelledOrders} from './../services/orderService'
import TabBar from './../components/tabBar'
import Reload from '../components/reload'
export const CancelledOrders = (props)=>{
    const [orders,SetOrders] = useState(null)
    const [dbError,setDbError] = useState(false)
    const getOrders=async()=>{
        const data = await getCancelledOrders(true)
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
    
    useEffect(()=>{
        getOrders()
        setDbError(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[props])

    return(
        <div><TabBar />
            {orders ?
        <div>
            
            <OrderTable {...props} orders={orders} refresh={()=>refresh()}  />
    <Snackbar open={snackBarOpen} message="Successfully Deleted" 
    autoHideDuration={3500} onClose={handleCloseSnack}>

    </Snackbar>
            </div>   :
    dbError ? 
   <Reload href="/orders/cancelledOrders" />
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
export default CancelledOrders