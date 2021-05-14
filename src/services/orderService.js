import axios from 'axios';
import { url, userId } from '../constants/auth'

export const getAllOrders = async () => {
    try {
        const data = await axios.get(url + '/get/all/totalOrders/')
        // console.log(data.data)
        if (!data.data.error) {
            return data.data.totalOrders
        }
    }
    catch (error) {
        // console.log(error)
        return false
    }
}
export const getOrdersCount = async () => {
    try {
        const data = await axios.get(url + '/get/all/ordersCount/')
        if (data.data.OrdersCount.OrdersCount[0]) {
            return {
                error: false,
                data: data.data.OrdersCount.OrdersCount[0]
            }
        }
        else {
            return {
                error: true
            }
        }
    }
    catch (error) {
        return { error: true }
    }
}
export const getActiveOrders = async () => {
    try {
        const data = await axios.get(url + '/get/all/activeOrders')
        console.log(data.data.activeOrders)
        if (!data.data.error) {
            return data.data.activeOrders
        }
    }
    catch (error) {
        return false
    }
}
export const getCancelledOrders = async (isCancelled) => {
    try {
        const data = await axios.get(url + '/get/all/orders/' + userId + '/' + isCancelled)
        // console.log(data.data)
        if (!data.data.error) {
            return data.data.orders
        }
    }
    catch (error) {
        // console.log(error)
        return false
    }
}

export const getDeliveredOrders = async (isDelivered) => {
    try {
        const data = await axios.get(url + '/get/all/delivered/orders/' + userId + '/' + isDelivered)
        
        if (!data.data.error) {
            return data.data.orders
        }
    }
    catch (error) {
        
        return false
    }
}

export const updateOrderStatus = async (status, id) => {
    try {
        const data = await axios.put(url + '/update/status/order/' + id.userId + '/' + id.orderId, status)
        if (!data.data.error) {
            if (status.status === "Processing") {
                 await axios.post(url + '/email/'+id.email,{
                    message:"Your order has been processed and ready for shipping"
                })
                const data = await axios.post(url + '/push/nofication/' + id.userId,

                    {
                        title: "Order Confirmed",
                        body: "Order is confirmed and ready for shipping"
                    })
                if (!data.data.error) {
                    return { error: false }
                }
            }
            else if (status.status === "Refunded") {
                 await axios.post(url + '/email/'+id.email,{
                    message:"Your order has been cancelled and refund process is initiated"
                })
                const data = await axios.post(url + '/push/nofication/' + id.userId,

                    {
                        title: "Order Refund initiated",
                        body: "Order is cancelled and refund is in process"
                    })
                if (!data.data.error) {
                    return { error: false }
                }
            }
            else {
                return { error: false }
            }

        }
    }
    catch (error) {
        
        return { error: true }
    }
}
export const sendMail=async(email,message)=>{
    try{
        const data = await axios.post(url + '/email/'+email,{
            message:message
        })
        if(!data.data.error){
            return {error:false}
        }
    }
    catch(error){
        return {
            error:true
        }
    }
}