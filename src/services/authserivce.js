import axios from 'axios'
import {url} from "../constants/auth"
// export function Login(email, password) {
//     if (email === "hari@gmail.com" && password === "Age@2021") {
//                 return true

//     }
    
//     else {
//         return false
//     }
// }
export const Login=async(loginDetails)=>{
    try{
        const data=await axios.post(url+"/admin/login",loginDetails)
        localStorage.setItem("token",data.data.token)    
        return true
    }    
    catch(error){
        return false
        
    }
}