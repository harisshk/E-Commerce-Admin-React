import axios from 'axios';
const jwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDcwM2QzNzM2NTIwZmViZDM1MGMxNGMiLCJpYXQiOjE2MTc5Njg4MDl9.UdQj7g7mpczwFTiHKZhKzjgby_nkUbgDGZBwMIAxRYY'
const userId = '60703d3736520febd350c14c'
const url='http://localhost:5050/api'
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