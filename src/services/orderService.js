import axios from 'axios';
import {url,userId} from '../constants/auth'

export const getAllOrders=async()=>{
    try{
        const data = await axios.get(url+'/get/all/orders/'+userId+'/false')
        console.log('Result',data.data.orders)
        if(!data.data.errror){
            return data.data.orders
        }
    }
    catch(error){
        console.log(error)
    }
}