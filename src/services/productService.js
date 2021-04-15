import * as axios from 'axios'

const jwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDcwM2QzNzM2NTIwZmViZDM1MGMxNGMiLCJpYXQiOjE2MTc5Njg4MDl9.UdQj7g7mpczwFTiHKZhKzjgby_nkUbgDGZBwMIAxRYY'
const userId = '60703d3736520febd350c14c'
//Get all Products.
export const getAllProducts = async () => {
    try {
        const data = await axios.get('http://localhost:5050/api/all/product/60703d3736520febd350c14c')
        console.log(data)
        if (!data.data.error) {
            return data.data.products
        }
        
    }
    catch (error) {
        console.log(error)
    }
}

//Get Categories.
export const getAllCategories = async () => {
    try {
        const data = await axios.get('http://localhost:5050/api/all/category')
        if (!data.data.error) {
            return data.data.categories
        }
    }
    catch (error) {
        console.log(error)
    }
}

//Get Tags
export const getAllTags = async () => {
    try {
        const dataTag = await axios.get('http://localhost:5050/api/all/tag')
        if (!dataTag.data.error) {
            return dataTag.data.tags
        }
    }
    catch (error) {
        console.log(error)
    }
}

//Get Variants
export const getAllVariants = async () => {
    try {
        const dataVariant = await axios.get('http://localhost:5050/api/all/variants')
        if (!dataVariant.data.error) {
            return dataVariant.data.variants
        }
    }
    catch (error) {
        console.log(error)
    }
}
// Upload/Addd formatter
export const adduploadFormatter = (formf,variantId,tagId) =>{
    const final = {
        name: formf.name,
        category: formf.category,
        tags: tagId,
        variants: variantId,
        brand: { brandName: formf.brandName },
        shortDescription: formf.shortDescription,
        warranty: formf.warranty,
        replacementPolicy: formf.replacementPolicy,
        additionalInformation: formf.additionalInformation,
        description: formf.description,
        dimensions: {
            height: formf.height,
            weight: formf.weight,
            depth: formf.depth,
            width: formf.width
        },
        manufactureDetails: {
            modelNumber: formf.modelNumber,
            modelName: formf.modelName,
            releaseDate: formf.releaseDate
        }, "jwtToken": jwt,
        isActive:formf.isActive


    }
    return final
}

//Add Product
export const addProduct = async (formf,variantId,tagId) => {
    const final = await adduploadFormatter(formf,variantId,tagId)
    try {
        const data = await axios.post('http://localhost:5050/api/add/product/'+userId, final)

        if (!data.data.error) {

            return true
        }
    }
    catch (error) {

        console.log(error)
    }
    // console.log('final', final)
}

//Deleting a product
export const deleteProduct = async (id) => {


    try {
        const data = await axios.delete('http://localhost:5050/api/delete/product/'+userId+'/' + id, {
            data:
            {
                "jwtToken": jwt
            }
        })
        if(!data.data.error){
            return true
        }
    }
    catch (error) {
        console.log('del', error)
    }
}
//edit values  are formatted for props 
export const editProductFormatter = (data) => {
    console.log('data', data)
    const arrayId = []
    const tagId =[]
    
    
    data.variants.map((edit)=>{
        arrayId.push(edit._id)
        // console.log(arrayId)
        return null;
    })
    data.tags.map((edit)=>{
        tagId.push(edit._id)
        return null;
    })
    const edit = {
        id:data._id,
        name: data.name,
        category: data.category._id,
        tags: data.tags,
        tagId:tagId,
        variants: data.variants,
        variantId:arrayId,
        brandName: data.brand.brandName,
        shortDescription: data.shortDescription,
        warranty: data.warranty,
        replacementPolicy: data.replacementPolicy,
        additionalInformation: data.additionalInformation,
        description: data.description,
        height: data.dimensions.height,
        weight: data.dimensions.weight,
        depth: data.dimensions.depth,
        width: data.dimensions.width,
        modelNumber: data.manufactureDetails.modelName,
        modelName: data.manufactureDetails.modelName,
        releaseDate: data.manufactureDetails.releaseDate,
        isActive:data.isActive
    }
    // console.log('Editt',edit)
    
    return edit
}

export const editProduct=async(formf,id,variantId,tagId)=>{
    const final = await adduploadFormatter(formf,variantId,tagId
        )
    console.log('final',final,id)
    try {
        const data = await axios.put('http://localhost:5050/api/update/product/'+userId+'/'+id,final)
        // console.log("Data of update",data.data.error)
        if (!data.data.error) {

            return true
        }
    }
    catch(err){
        console.log("Error in update prouct",err)
    }
}

//Add Variants
export const addVariant = async(variant,imageArray)=>{
    
    try {
        const data = await axios.post('http://localhost:5050/api/add/variant/'+userId, 
        {
            color:variant.color,
            size:variant.size,
            price:variant.price,
            stock:variant.stock,
            gallery:imageArray,
            "jwtToken": jwt
    })
    if(!data.data.error){
    
        return data.data.variants
    }
    }
    catch(err){
        console.log("error in add variant",err)
    }
    
}

//Update Variant
export const updateVariant = async(variant,imageArray,variantId)=>{
    try{
        const data =await axios.put('http://localhost:5050/api/update/variant/'+userId+'/'+variantId,
        {
            color:variant.color,
            size:variant.size,
            price:variant.price,
            stock:variant.stock,
            gallery:imageArray,
            "jwtToken": jwt
    })
        
        if (!data.data.error) {
            return data
        }
    }
    catch(error){
        console.log("Error in update variant",error)
    }
    

}