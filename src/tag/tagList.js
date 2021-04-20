import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import {getAllTag,deleteTag} from './../services/tagService'
import {Spinner,Button} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import TagModal from './tagModal'
export const TagList =(props)=>{
    const [tag,SetTag]= useState(null)
    const [modalShow,setModalShow]= useState(false)
    const [isEdit,setIsEdit]= useState(false)
    const getTag=async()=>{
        const data = await getAllTag()
        console.log(data)
        if(data){
            SetTag(data)
        }
    }
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
    }
    const open=()=>{
        setModalShow(true)
    }
    const modalClose=()=> {
        setModalShow(false)
        
    
    }
    const columns= [
        { title: "Tag Name", field: 'tag' },
        {
            title: "Is Active", field: 'isActive',
            render: rowData => {
                if (rowData.isActive) {
                        return (
                            <p style={{ color: 'green', fontWeight: "bolder" }}>Active</p>
                                 )
                }
                else {
                    return (
                        <p style={{ color: 'red', fontWeight: "bolder" }}>InActive</p>
                            )
                }
            }
        },
    ]
    useEffect(()=>{
        getTag()
        setSnackBarOpen(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[props])
    return (
        <div>
           {tag ?
            <div>
                <Button onClick={()=>{open()}}>Add Tag</Button>
                <Button onClick={()=>{props.history.replace('/home')}}>Back</Button>
                <MaterialTable title="Tag" columns={columns} data={tag}
            actions={ [
            {
                icon: 'edit',
                tooltip: 'Edit Tag',
                onClick: async (event, rowData) => {
                    console.log(rowData)
                }
            }
        ]}
        editable={{
            onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
                const id = selectedRow._id
                const data= await deleteTag(id)
                if(data){
                    setSnackBarOpen(true)
                    getTag()
                    setTimeout(() => {

                        resolve()
                    }, 500);
                }
            }),
        }}
        options={{
            actionsColumnIndex: -1,
            showFirstLastPageButtons: false,
            pageSizeOptions: [5, 10, 20, 50]
        }}
        ></MaterialTable>
        <TagModal
         show={modalShow}
         onHide={() => {
            modalClose()
        }}
        isEdit={isEdit}
        ></TagModal>
        <Snackbar open={snackBarOpen} message="Successfully Deleted" 
        autoHideDuration={3500} onClose={handleCloseSnack}>
    
    </Snackbar>
            </div>
    :
    <div style={{width:'100%',height:'100px',marginTop:'300px'}} >
    <Spinner  style={{display:'block',marginLeft:'auto',
    marginRight:'auto',height:'50px',width:'50px'}} animation="border" variant="primary" />
    <p style={{display:'block',marginLeft:'auto',
    marginRight:'auto',textAlign:'center'}}>Loading</p>
    </div>
    }
        </div>
    )
}
export default TagList