import axios from 'axios';
import {url,jwt,userId} from './../constants/auth'
export const getAllCategory=async()=>{
    try{
        const data= await axios.get(url+'/all/category')
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

export const getAllSubCategory=async(categoryId)=>{
    try{
        const data= await axios.get(url+'/all/subCategory/'+categoryId)
        // console.log('=-=-=-=-=-',data.data.subCategories)
        if(!data.data.error){

            return data.data.subCategories
        }
    }
    catch(error){
        if(error){
            return false
        }
    }
}


export const addCategory=async(category)=>{
   
    try{
        const data= await axios.post(url+'/add/category/'+userId,{
            name:category.name,
            "jwtToken": jwt,
            coverImage:category.coverImage
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

export const addSubCategory=async(subCategory)=>{
   console.log(subCategory)
    try{
        const data= await axios.post(url+'/add/subCategory/'+subCategory.categoryId,{
            name:subCategory.subCategoryName,
            parentCategory:subCategory.categoryId,
            "jwtToken": jwt,
            coverImage:subCategory.coverImage
        })
        // console.log('caegoyt',data)
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
//    console.log('=-=-===',category)
    try{
        const data= await axios.put(url+'/update/category/'+userId+'/'+category.id,{
            name:category.name,
            "jwtToken": jwt,
            isActive:category.isActive,
            coverImage:category.coverImage
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
export const updateSubCategory=async(subCategory,isActive,id)=>{
    // console.log('=-=-===',subCategory)
     try{
         const data= await axios.put(url+'/update/subCategory/'+id,{
             name:subCategory.subCategoryName,
             isActive:isActive,
             coverImage:subCategory.coverImage
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
export const deleteCategory=async(categoryId)=>{
    // console.log('=-=-===',categoryId)
     try{
         const data= await axios.put(url+'/delete/category/'+userId+'/'+categoryId,{
             "jwtToken": jwt
         })
        //  console.log('caegoyt',data)
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
 export const deleteSubCategory=async(subCategoryId)=>{
    // console.log('=-=-===',subCategoryId)
     try{
         const data= await axios.put(url+'/delete/subCategory/'+subCategoryId)
        //  console.log('caegoyt',data)
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