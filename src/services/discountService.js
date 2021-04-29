import {url} from './../constants/auth'
import axios from 'axios'
export const getAllDiscount=async()=>{
    try{
        const data = await axios.get(url+'/get/discounts')
        // console.log(data)
        if(!data.data.error){
            return {
                error:false,
                data:data.data.discount
            }
        }
    }
    catch(error){
        console.log(error)
    }
}
export const addDiscount=async(discount)=>{
    try{
        const data = await axios.post(url+'/add/discounts',discount)
        if(!data.data.error){
            return {
                error:false,
            }
        }
    }
    catch(error){
        return{
            error:true
        }
    }
}
export const updateDiscount=async(discount,id)=>{
    try{
        const data = await axios.put(url+'/update/discounts/'+id,discount)
        if(!data.data.error){
            return {
                error:false,
            }
        }
    }
    catch(error){
        return{
            error:true
        }
    }
}
export const deleteDiscount=async(id)=>{
    try{
        const data = await axios.put(url+'/delete/discounts/'+id)
        if(!data.data.error){
            return {
                error:false,
            }
        }
    }
    catch(error){
        return{
            error:true
        }
    }
}