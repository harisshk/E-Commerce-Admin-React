import axios from 'axios';
import {url,userId} from '../constants/auth'

export const getAllOrders=async()=>{
    try{
        const data = await axios.get(url+'/get/all/totalOrders/')
        console.log(data.data)
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
        if(data.data.OrdersCount.OrdersCount[0]){
            return {
                error:false,
                data:data.data.OrdersCount.OrdersCount[0]
            }
        }
        else{
             return{
                 error:true
             }
        }
    }
    catch(error){
        return {error:true}
    }
}
export const getActiveOrders=async()=>{
    try{
        const data = await axios.get(url+'/get/all/activeOrders')
        console.log(data.data.activeOrders)
        if(!data.data.error){
            return data.data.activeOrders
        }
    }
    catch(error){
        return false
    }
}
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

export const updateOrderStatus = async (status,id)=>{
    console.log('------',status)
    console.log('------',id)

    try{
        const data = await axios.put(url+'/update/status/order/'+id.userId+'/'+id.orderId,status)
        // console.log(data.data)
        if(!data.data.error){
            if(status.status==="Order Confirmed"){
                const data= await axios.post(url+'/push/nofication/'+id.userId,
                {
		title: "Order Confirmed",
		body: "Order is confirmed and ready for packing"
	})
                if(!data.data.error){
                    const data = await axios.put(url+'/update/status/order/'+id.userId+'/'+id.orderId,{pushStatus:true})
                    if(!data.data.error){
                        return true
                    }
                }
            }
            
        }
    }
    catch(error){
        // console.log(error)
        return false
    }    
}