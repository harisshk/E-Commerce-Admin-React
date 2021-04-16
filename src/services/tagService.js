import * as axios from 'axios'

const jwt='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDcwM2QzNzM2NTIwZmViZDM1MGMxNGMiLCJpYXQiOjE2MTc5Njg4MDl9.UdQj7g7mpczwFTiHKZhKzjgby_nkUbgDGZBwMIAxRYY'
const userId = '60703d3736520febd350c14c'

export const addTag = async(tag)=>{
    
    try {
        const data = await axios.post('http://localhost:5050/api/add/tag/'+userId, 
        {
           tag:tag,
            "jwtToken": jwt
    })
    // console.log('Tagd',data)
    
    if(!data.data.error){
    
        return data.data.tag
    }
    }
    catch(err){
        if(err){
            return false
        }
        // console.log("error in add variant",err)
    }
    
}
