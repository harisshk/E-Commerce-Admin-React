import axios from 'axios';
import {url,userId} from '../constants/auth'

export const getAllOrders=async()=>{
    try{
        const data = await axios.get(url+'/get/all/orders/'+userId+'/false')
        console.log('Result',data.data.orders)
        if(!data.data.error){
            return data.data.orders
        }
    }
    catch(error){
        console.log(error)
    }
}
export const getTotalOrders=async()=>{
    try{
        const data = await axios.get(url+'/all/totalOrder/')
        console.log('Result',data.data.totalOrders)
        if(!data.data.error){
            return data.data.totalOrders
        }
    }
    catch(error){
        console.log(error)
    }
}
export const getActiveOrders=async()=>{
    try{
        const data = await axios.get(url+'/all/activeOrder/')
        console.log('Result',data.data.activeOrders)
        if(!data.data.error){
            return data.data.activeOrders
        }
    }
    catch(error){
        console.log(error)
    }
}