import React,{useEffect,useState} from 'react'
import Table from './../components/table'
import {getAllAdmin,deleteAdmin} from './../services/adminService';
import {Button} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar'
import SpinLoader from './../components/spinLoader'
import NavBar from './../components/navBar'
import dateFormat from 'dateformat';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ResetPassword from '../components/resetPasswordModal';
import Reload from '../components/reload';

export const UserList=(props)=>{
    const [users,setUsers]=useState(null)
    const [dbError,setDbError]=useState(false)
    const [modalShow,setModalShow]=useState(false)
    const [id,setId]=useState('')
    const [name,setName]=useState('')
    const getUser=async()=>{
        const data = await getAllAdmin()
        if(!data.error){
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
    const [resetSnackBar,setResetSnackBarOpen] = useState(false)
    const handleCloseResetSnack=()=>{
        setSnackBarOpen(false)
    }
    const onHide=()=>{
        setModalShow(false)
        setResetSnackBarOpen(true)
        setTimeout(() => {
            setResetSnackBarOpen(false)
        }, 2000);
    }
    const column=[
     {title:"Name",field:"name"},
     {title:"Email",field:"email"},
     {title:"Role",field:"role", render: rowData => {
        if(rowData.role===""){
            return(<p > <FiberManualRecordIcon fontSize="inherit" style={{ color: 'orange' }} />Account not activated</p>)
        }
        else{
            return(<p > {rowData.role}</p>)
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
    },{title: "Reset Password", field: 'isActive',
    render: rowData => {
        return(
            <Button onClick={()=>{setId(rowData._id)
                    setName(rowData.name)
                    setModalShow(true)
            }}>Reset</Button>
        )
    }}
    ]
    const options ={
        actionsColumnIndex: -1,
        showFirstLastPageButtons: false,
        pageSize:6,
        pageSizeOptions: [6, 12, 20,50],
        emptyRowsWhenPaging:false,

    }
    const actions=[
            {icon: 'edit',
            tooltip: 'activate account',
            onClick: async (event, rowData) => {
                props.history.replace({
                    pathname: '/users/add',
                    state: rowData
                })                
            }}
    ]
    const editable={
        onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
            const id = selectedRow._id
            const data = await deleteAdmin(id)
            if (!data.error) {
                setSnackBarOpen(true)
                getAllAdmin()
                resolve()
            }
        }),
    }
    useEffect(() => {
        getUser()
        setModalShow(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div><NavBar />
        
            {users ?
                <div>
                    
                    <div style={{ margin: '10px 20px' }}>
                        <Button onClick={() => { props.history.push('/users/add') }}>Add User</Button>
                    </div>
                    <Table data={users} editable={editable} actions={actions} options={options} title={"Users"} columns={column} style={{margin:"0px 200px"}}/>
                </div>
                :
                dbError ?
                    <Reload href="/product" />
                    :
                    <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >
                        <SpinLoader />
                        <p style={{
                            display: 'block', marginLeft: 'auto',
                            marginRight: 'auto', textAlign: 'center'
                        }}>Loading</p>
                    </div>

            }
    <ResetPassword show={modalShow} onHide={()=>onHide()} id={id} name={name} />
<Snackbar open={snackBarOpen} message="Successfully Deleted"
    autoHideDuration={3500} onClose={handleCloseSnack} />
    <Snackbar open={resetSnackBar} message="Password Successfully Reseted"
    autoHideDuration={2000} onClose={handleCloseResetSnack} />
        </div>
    )
}
export default UserList