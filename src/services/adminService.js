import axios from 'axios'
import {url} from './../constants/auth'
export const createAdmin=async(admin)=>{
    try{
        const data = await axios.post(url+"/add/admin",admin)
        if(!data.data.error){
            return {
                error:false,
                data:data.data.admin
            }
        }
        else{
            return {
                error:true
            }
        }
    }
    catch(error){
        return {
            error:true
        }
    }
}
export const getAllAdmin=async()=>{
    try{
        const data = await axios.get(url+"/get/admin")
        if(!data.data.error){
            return {
                error:false,
                data:data.data.admin
            }
        }
    }
    catch(error){
        console.log(error)
    }
}

export const getInactiveAdmin=async()=>{
    try{
        const data = await axios.get(url+"/get/inactiveAdmin")
        if(!data.data.error){
            return {
                error:false,
                data:data.data.admin
            }
        }
    }
    catch(error){
        console.log(error)
    }
}

export const updateAdmin=async(details,id)=>{
    try{
        const data = await axios.put(url+"/update/admin/"+id,details)
        if(!data.data.error){
            return {
                error:false,
                data:data
            }
        }
    }
    catch(error){
        console.log(error)
    }    
}