import axios from 'axios'
import {url} from "../constants/auth"
export const Login=async(loginDetails)=>{
    try{
        const data=await axios.post(url+"/admin/login",loginDetails)
        console.log(data.data)
        localStorage.setItem("name",data.data.name)
        localStorage.setItem("token",data.data.token)  
        return true
    }    
    catch(error){
        return false
    }
}