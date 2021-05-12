import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar'
import Table from '../components/table'
import {getAllBanner} from '../services/bannerService'
export const BannerList = (props)=>{
    const [banner,setBanner]=useState(null)
    const [dbError,setDbError]=useState(false)
    const getBanner=async()=>{
        const data =await getAllBanner()
        if(!data.error){
            console.log(data.data)
            setBanner(data.data)
        }
        else{
            setDbError(true)
        }
    }
    const column=[
        {title:"Banner Image",field:"",
    render:rowData=>{
        return(<img 
            src={rowData.bannerImage}
            width="250px"
            height="150px"
             />)
    }},
        {title:"Banner Name",field:"title"},
        {title:"Is Active",
    render:rowData=>{
        if(rowData.isActive){
            return(<b style={{color:"green"}}>Active</b>)
        }
        else{
            return(<b style={{color:"red"}}>In Active</b>)

        }
    }},
]
    useEffect(()=>{
        getBanner()
    },[])
    return(
        <div>
            <NavBar />
            <Table data={banner} title="Banner" columns={column}/>
        </div>
    )
}
export default BannerList 