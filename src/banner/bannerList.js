import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar'
import Table from '../components/table'
import {getAllBanner,deleteBanner} from '../services/bannerService'
import Reload from '../components/reload'
import SpinLoader from '../components/spinLoader'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert';

export const BannerList = (props)=>{
    const [banner,setBanner]=useState(null)
    const [dbError,setDbError]=useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [snackBar, setSnackBar] = useState(false)
    const handleCloseSnack = () => {
        setSnackBarOpen(false)
    }
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
            alt=""
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
const actions=[
    {
        icon: 'edit',
        tooltip: 'Edit Tag',
        onClick: async (event, rowData) => {
            props.history.replace({
                pathname: '/banner/add',
                state: rowData
            })   
        }
    }
]
const options ={
    actionsColumnIndex: -1,
    showFirstLastPageButtons: false,
    pageSize:10,
    pageSizeOptions: [10, 20, 50],
    emptyRowsWhenPaging:false,

}
const editable={
    onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
        const data = await deleteBanner(selectedRow._id)
        if(!data.error){
            setSnackBarOpen(true)
            setTimeout(() => {
                resolve()
                getBanner()
                setSnackBarOpen(false)
            }, 2000);
        }else{
            setSnackBar(true)
            setTimeout(() => {
                resolve()
                setSnackBar(false)
            }, 2000);
        }

    }),
}
    useEffect(()=>{
        getBanner()
    },[])
    return(
        <div>
            <NavBar  />
            
            {
            banner ? 
            <div style={{margin:"10px"}}>
                <Button onClick={()=>props.history.replace("/banner/add")}>Add Banner</Button>
                <Table data={banner} options={options} title="Banner" columns={column} actions={actions} editable={editable}/>
            </div>
            :dbError?<Reload href={"/banner"}/>
            : <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >
            <SpinLoader />
            <p style={{
                display: 'block', marginLeft: 'auto',
                marginRight: 'auto', textAlign: 'center'
            }}>Loading</p>
        </div>
            }
            <Snackbar open={snackBarOpen} message="Successfully Deleted"
                autoHideDuration={2000} onClose={handleCloseSnack}>
            </Snackbar>
            <Snackbar open={snackBar} message="DB Error" color='red'
                autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert severity="error">Error in deleting banner !</Alert>

            </Snackbar>
        </div>
    )
}
export default BannerList 