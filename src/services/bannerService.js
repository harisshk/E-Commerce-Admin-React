import {url} from '../constants/auth'
import axios from 'axios'
export const getAllBanner=async()=>{
    try{
        const data = await axios.get(url+"/banners/all")
        if(!data.data.error){
            return({
                error:false,
                data:data.data.banners
            })
        }
    }
    catch(error){
        console.log(error)
    }
}