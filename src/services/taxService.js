import {url} from './../constants/auth'
import axios from "axios"

export const getAllTax=async()=>{
    try{
        const data = await axios.get(url+"/get/tax")
        if(!data.data.error){
            return {
                error:false,
                data:data.data.data
            }
        }
        else{
            return {
                error:true,
            }
        }
    }
    catch(error){
        return {
            error:true,
        }
    }
}
export const deleteTax=async(id)=>{
    try{
        const data = await axios.put(url+"/delete/tax/"+id)
        if(!data.data.error){
            return {
                error:false,
            }
        }
        else{
            return {
                error:true,
            }
        }
    }
    catch(error){
        return {
            error:true,
        }
    }
}
export const updateTax=async(id,taxDetails)=>{
    try{
        const data = await axios.put(url+"/update/tax/"+id,taxDetails)
        if(!data.data.error){
            return {
                error:false,
            }
        }
        else{
            return {
                error:true,
            }
        }
    }
    catch(error){
        return {
            error:true,
        }
    }
}
export const addTax=async(taxDetails)=>{
    
    try{
        const data = await axios.put(url+"/add/tax",taxDetails)
        if(!data.data.error){
            return {
                error:false,
            }
        }
        else{
            return {
                error:true,
            }
        }
    }
    catch(error){
        return {
            error:true,
        }
    }
}