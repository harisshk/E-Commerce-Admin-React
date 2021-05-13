import {url, userId,jwt} from '../constants/auth'
import axios from 'axios'
export const getAllBanner=async()=>{
    try{
        const data = await axios.get(url+"/banners/all/admin")
        if(!data.data.error){
            return({
                error:false,
                data:data.data.banners
            })
        }
    }
    catch(error){
        return{error:true}    }
}
export const updateBanner=async(bannerDetails)=>{
    console.log(bannerDetails)
    try{
        const data = await axios.put(url+"/update/banner/"+userId+"/"+bannerDetails._id,{...bannerDetails,jwtToken:jwt})
        if(!data.data.error){
            return({
                error:false,
                
            })
        }
    }
    catch(error){
        return{error:true}    }
}
export const addBanner=async(bannerDetails)=>{
    console.log(bannerDetails)
    try{
        const data = await axios.post(url+"/add/banner/"+userId,bannerDetails)
        if(!data.data.error){
            return({
                error:false,    
            })
        }
        else{
            return({
                error:true ,    
            })
        }
    }
    catch(error){
        return{error:true}
    }
}
export const deleteBanner=async(bannerId)=>{
    try{
        const data = await axios.put(url+"/delete/banner/"+userId+"/"+bannerId)
        console.log(data)
        if(!data.data.error){
            return { error:false}
        }
        else{
            return {error:true}
        }
    }
    catch(error){
        return {error:true}
    }
}