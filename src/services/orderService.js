import axios from 'axios';
import {url,userId} from '../constants/auth'

export const getAllOrders=async()=>{
    try{
        const data = await axios.get(url+'/get/all/totalOrders/')
        // console.log(data.data)
        if(!data.data.error){
            return data.data.totalOrders
        }
    }
    catch(error){
        // console.log(error)
        return false
    }
}
export const getOrdersCount=async()=>{
    try{
        const data = await axios.get(url+'/get/all/ordersCount/')
        console.log(data.data.OrdersCount.OrdersCount[0])
        if(!data.data.error){
            return {
                error:false,
                data:data.data.OrdersCount.OrdersCount[0]
            }
        }
    }
    catch(error){
        return {error:true}
    }
}
// export const getActiveOrders=async()=>{
//     try{
//         const data = await axios.get(url+'/get/all/activeOrderCount/')
//         if(!data.data.error){
//             return {
//                 error:false,
//                 data:data.data.activeOrders
//             }
//         }
//     }
//     catch(error){
//         return {error:true}
//     }
// }
export const getCancelledOrders=async(isCancelled)=>{
    try{
        const data = await axios.get(url+'/get/all/orders/'+userId+'/'+isCancelled)
        // console.log(data.data)
        if(!data.data.error){
            return data.data.orders
        }
    }
    catch(error){
        // console.log(error)
        return false
    }
}

export const getDeliveredOrders=async(isDelivered)=>{
    try{
        const data = await axios.get(url+'/get/all/delivered/orders/'+userId+'/'+isDelivered)
        // console.log(data.data)
        if(!data.data.error){
            return data.data.orders
        }
    }
    catch(error){
        // console.log(error)
        return false
    }
}
export const updateOrderStatus = async (status,orderId)=>{
    try{
        const data = await axios.put(url+'/update/status/order/'+userId+'/'+orderId,status)
        // console.log(data.data)
        if(!data.data.error){
            return true
        }
    }
    catch(error){
        // console.log(error)
        return false
    }    
}