import * as axios from 'axios'
import { url, jwt, userId } from './../constants/auth'
axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    error =>{
        return Promise.reject(error)
    }
)
//Get all Products.
export const getAllProducts = async () => {
    

    try {
        const data = await axios.get(url + '/all/product/60703d3736520febd350c14c')
            
        if (!data.data.error) {
            return data.data.products
        }
    }
    catch (error) {
        if (error) {
            return false
        }
        // console.log(error)
    }
}

//Get Categories.
//Get Tags
export const getAllTags = async () => {
    try {
        const dataTag = await axios.get(url + '/all/tag')
        if (!dataTag.data.error) {
            return dataTag.data.tags
        }
    }
    catch (error) {
        if (error) {
            return false
        }
        // console.log(error)
    }
}

//Get Variants
export const getAllVariants = async () => {
    try {
        const dataVariant = await axios.get(url + '/all/variants')
        if (!dataVariant.data.error) {
            return dataVariant.data.variants
        }
    }
    catch (error) {
        if (error) {
            return false
        }
        // console.log(error)
    }
}
// Upload/Addd formatter
export const adduploadFormatter = (formf, gallery, tagId) => {
    const final = {
        name: formf.name,
        category: formf.category,
        tags: tagId,
        price: formf.price,
        stock: formf.stock,
        gallery: gallery,
        tax: formf.tax,
        subCategory: formf.subCategory,
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
        isActive: formf.isActive
    }
    return final
}

//Add Product
export const addProduct = async (formf, gallery, tagId) => {
    const final = await adduploadFormatter(formf, gallery, tagId)
    // console.log("Final",final)
    try {
        const data = await axios.post(url + '/add/product/' + userId, final)
        // console.log("-----",data)
        if (!data.data.error) {

            return true
        }
    }
    catch (error) {
        if (error) {
            return false
        }
        // console.log(error)
    }
    // console.log('final', final)
}
export const addCSVProduct=async(product)=>{
    try {
        const data = await axios.post(url + '/add/product/' + userId,{ ...product,"jwtToken": jwt,})
            return {error:false,
            data:data.data.product.name,
            message:data.data.message}
    }
    catch (error) {
        if (error) {
            return  {error:true,
                message:"DB error"}
        }
        // console.log(error)
    }
}
//Deleting a product
export const deleteProduct = async (id) => {
    try {
        const data = await axios.delete(url + '/delete/product/' + userId + '/' + id, {
            data:
            {
                "jwtToken": jwt
            }
        })
        if (!data.data.error) {
            return true
        }
    }
    catch (error) {
        if (error) {
            return false
        }
        // console.log('del', error)
    }
}
//edit values  are formatted for props 
export const editProductFormatter = (data) => {
    // console.log('data', data)
    const tagId = []
    data.tags.map((edit) => {
        tagId.push(edit._id)
        return null;
    })
    const edit = {
        id: data._id,
        name: data.name,
        category: data.category._id,
        tags: data.tags,
        tagId: tagId,
        tax: data.tax,
        price: data.price,
        subCategory: data.subCategory._id,
        stock: data.stock,
        gallery: data.gallery,
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
        isActive: data.isActive
    }
    // console.log('Editt',edit)
    return edit
}
export const editProduct = async (formf, id, gallery, tagId) => {
    const final = await adduploadFormatter(formf, gallery, tagId
    )
    // console.log('final',final,id)
    try {
        const data = await axios.put(url + '/update/product/' + userId + '/' + id, final)
        // console.log("Data of update",data.data.error)
        if (!data.data.error) {

            return true
        }
    }
    catch (err) {
        if (err) {
            return false
        }
        // console.log("Error in update prouct",err)
    }
}

//Add Variants
export const addVariant = async (variant, imageArray) => {
    try {
        const data = await axios.post(url + '/add/variant/' + userId,
            {
                color: variant.color,
                size: variant.size,
                price: variant.price,
                stock: variant.stock,
                gallery: imageArray,
                "jwtToken": jwt
            })
        // console.log(data)
        if (!data.data.error) {

            return data.data.data
        }
    }
    catch (err) {
        if (err) {
            return false
        }
        // console.log("error in add variant",err)
    }
}

//Update Variant
export const updateVariant = async (variant, imageArray, variantId) => {
    try {
        const data = await axios.put(url + '/update/variant/' + userId + '/' + variantId,
            {
                color: variant.color,
                size: variant.size,
                price: variant.price,
                stock: variant.stock,
                gallery: imageArray,
                "jwtToken": jwt
            })

        if (!data.data.error) {
            return data
        }
    }
    catch (error) {
        if (error) {
            return false
        }
        // console.log("Error in update variant",error)
    }
}

export const getProductsCount = async () => {
    try {
        const data = await axios.get(url + '/get/productsCount')
        // console.log("TNumber of products",data.data.totalProducts)
        if (!data.data.error) {
            return {
                error: false,
                data: data.data.productsCount[0]
            }
        }
        else {
            return { error: true }
        }
    }
    catch (error) {
        return { error: true }
    }
}