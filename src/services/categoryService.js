import axios from 'axios';
import {url,jwt,userId} from './../constants/auth'
export const getAllCategory=async()=>{
    try{
        const data= await axios.get(url+'//all/category')
        // console.log('caegoyt',data.data.categories)
        if(!data.data.error){
            return data.data.categories
        }
    }
    catch(error){
        if(error){
            return false
        }
    }
}

export const addCategory=async(categoryName)=>{
   
    try{
        const data= await axios.post(url+'/add/category/'+userId,{
            name:categoryName,
            "jwtToken": jwt
        })
        console.log('caegoyt',data)
        if(!data.data.error){
            return true
        }
        else{
            return false
        }
    }
    catch(error){
        if(error){
            return false
        }
    }
}

export const updateCategory=async(category)=>{
   console.log('=-=-===',category)
    try{
        const data= await axios.put(url+'/update/category/'+userId+'/'+category.id,{
            name:category.name,
            "jwtToken": jwt,
            isActive:category.isActive
        })
        console.log('caegoyt',data)
        if(!data.data.error){
            return true
        }
    }
    catch(error){
        if(error){
            return false
        }
    }
}
export const deleteCategory=async(categoryId)=>{
    console.log('=-=-===',categoryId)
     try{
         const data= await axios.put(url+'/delete/category/'+userId+'/'+categoryId,{
             "jwtToken": jwt
         })
         console.log('caegoyt',data)
         if(!data.data.error){
             return true
         }
     }
     catch(error){
         if(error){
             return false
         }
     }
 }