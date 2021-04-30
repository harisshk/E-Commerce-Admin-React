import React,{useEffect,useState} from 'react'
import Table from './../components/table'
import {getAllAdmin} from './../services/adminService';
import {Button} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar'
import SpinLoader from './../components/spinLoader'
import NavBar from './../components/navBar'
import dateFormat from 'dateformat';
import UserTab from '../components/usertab';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ActivateAccount from './../components/activateAccount'
export const UserList=(props)=>{
    const [users,setUsers]=useState(null)
    const [dbError,setDbError]=useState(false)
    const [modalShow,setModalShow]=useState(false)
    const [id,setId]=useState('')
    const getUser=async()=>{
        const data = await getAllAdmin()
        if(!data.error){
            console.log(data.data)
            setUsers(data.data)
        }
        else{
            setDbError(true)
        }
    }
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
    }
    const onHide=()=>{
        setModalShow(false)
        setTimeout(() => {
            getUser()
        }, 400);
    }
    const column=[
     {title:"Name",field:"name"},
     {title:"Email",field:"email"},
     {title:"Role",field:"role", render: rowData => {
        if(rowData.role===""){
            return(<p > <FiberManualRecordIcon fontSize="inherit" style={{ color: 'orange' }} />Account not activated</p>)
        }
    }},
     {title:"Account created",field:"",
     render: rowData => {
        return (
            <div>
                <p>{dateFormat(rowData.createdAt, "mmmm dS, yyyy ")}</p>
            </div>
        )
    }},
     {title: "Is Active", field: 'isActive',
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
    },{title: "Activated", field: 'isActive',
    render: rowData => {
        if (rowData.isActivated) {
            return (
                <p  className="green">Active</p>
            )
        }
        else {
            return (
                <p className="red">InActive</p>
            )
        }
    }
},
    ]
    const options ={
        actionsColumnIndex: -1,
        showFirstLastPageButtons: false,
        pageSize:6,
        pageSizeOptions: [6, 12, 20,50],
        emptyRowsWhenPaging:false,

    }
    const actions=[
        rowData=>({
            disabled:rowData.isActivated,
            icon: 'settings',
            tooltip: 'activate account',
            onClick: async (event, rowData) => {
                setModalShow(true)
                setId(rowData._id)
                
            }
        })
    ]
    // const editable={
    //     onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
    //         const id = selectedRow._id
            
    //         if (true) {
    //             setSnackBarOpen(true)
                
    //             resolve()
    //         }
    //     }),
    // }
    useEffect(() => {
        getUser()
        setModalShow(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div><NavBar />
        <UserTab/>
            {users ?
                <div>
                    
                    <div style={{ margin: '10px 20px' }}>
                        <Button onClick={() => { props.history.push('/users/add') }}>Add User</Button>
                    </div>
                    <Table data={users}  actions={actions} options={options} title={"Users"} columns={column} style={{margin:"0px 200px"}}/>
                </div>
                :
                dbError ?
                    <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >

                        <p style={{
                            display: 'block', marginLeft: 'auto',
                            marginRight: 'auto', textAlign: 'center'
                        }}>Looks like Server Down!!
             <br /><a href="/product">
                                Try Reloading the page
</a></p>

                    </div>
                    :
                    <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >
                        <SpinLoader />
                        <p style={{
                            display: 'block', marginLeft: 'auto',
                            marginRight: 'auto', textAlign: 'center'
                        }}>Loading</p>
                    </div>

            }
    <ActivateAccount show={modalShow} onHide={()=>onHide()} id={id} />
<Snackbar open={snackBarOpen} message="Successfully Deleted" 
    autoHideDuration={3500} onClose={handleCloseSnack} />
        </div>
    )
}
export default UserList