import React,{useEffect, useState} from 'react'
import {getAllOrders} from '../services/orderService'
import { Spinner} from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import MaterialTable from 'material-table'
import dateFormat from 'dateformat';
import { GiMoneyStack } from "react-icons/gi";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './orderList.css'
import { FiTruck } from "react-icons/fi";
import { BiMessageError ,BiMessageAltCheck} from "react-icons/bi";


// import Paid from '@material-ui/icons/Paid';

export const OrderList=(props)=>{
    const [orders,SetOrders] = useState(null)
    const [dbError,setDbError] = useState(false)
    const getOrders=async()=>{
        const data = await getAllOrders()
        console.log("orders----------",data)
        
        if(data){
            SetOrders(data)
        }
        else{
            setDbError(true)
        }
    }
    const subcolumn=[{ title: "Products", field: 'product.name' },
    { title: "Quantity", field: 'quantity' },                
    { title: "Price", field: 'product.price' },                
        ]
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
    }
    const columns= [
        { title: "Order Number", field: 'name' },
        { title: "Customer Name", field: 'address.name' },
        { title: "Order Created", field: 'createdAt',
            render: rowData => {
                return(
                    <div>
                        <p>{dateFormat(rowData.createdAt, "mmmm dS, yyyy ")}</p>
                        <p style={{color:'#4a4a48'}}>{dateFormat(rowData.createdAt, "hh:mm")}</p>
                    </div>
                )
            }
        },
        { title: "Order Updated", field: 'updatedAt',
            render: rowData => {
                return(
                    <div>
                        <p>{dateFormat(rowData.updatedAt, "mmmm dS, yyyy ")}</p>
                        <p style={{color:'#4a4a48'}}>{dateFormat(rowData.createdAt, "hh:mm")}</p>
                    </div>
                )
            }
        },
        { title: "Order Status", field: 'status' ,
        render: rowData => {
            if(rowData.status==='Order Placed'){ return(
                <p  >
                <FiberManualRecordIcon fontSize="inherit" style={{ color: 'green' }} />Order placed</p>
            )}
            else {return(
                <p >
                <FiberManualRecordIcon fontSize="inherit" style={{ color: 'yellow' }} />Order Accepted</p>
            )}
            
        }},
        { title: "Payment Type", field: 'paymentType',
        render: rowData => {
            if(rowData.paymentType==='COD'){
                return(
                    <p><GiMoneyStack size={30} />COD</p>
                )
            }
            else if((rowData.paymentType==='UPI')){
                return(
                    <p>UPI</p>
                )
            }
        }
     },
     { title: "Delivery Status", field: 'isDelivered',
        render: rowData => {
            if(rowData.isDeliverd){
                return(
                    <p  className="green">
                    Delivered</p>
                )
            }
            else {
                return(
                    <p  ><FiTruck color={'black'} size={20}></FiTruck>
                on Progress</p>
                )
            }
        }
     },
     { title: "Delivery Status", field: 'isDelivered',
        render: rowData => {
            if(rowData.pushStatus){
                return(
                    <p  className="green"><BiMessageAltCheck size={30}></BiMessageAltCheck>
                    Delivered</p>
                )
            }
            else {
                return(
                    <p  className="yellow"><BiMessageError size={30}></BiMessageError>
                Not send</p>
                )
            }
        }
     },
        {
            title: "Is Active", field: 'isActive',
            render: rowData => {
                if (rowData.isActive) {
                        return (<p style={{ color: 'green', fontWeight: "bolder" }}>Active</p>)
                }
                else {
                    return (<p style={{ color: 'red', fontWeight: "bolder" }}>InActive</p>)
                }
            }},
    ]
    useEffect(()=>{
        getOrders()
        setDbError(false)
     // eslint-disable-next-line react-hooks/exhaustive-deps      
    },[props])

    return(
        <div>
            {orders ?
        <div><h3>Orders Page</h3>
            <MaterialTable style={{overflow:"none" ,margin: '15px 40px' }} title='' data={orders}
        columns={columns}
        detailPanel={[
            {
                icon:'expand_more',
              tooltip: 'Show Details',
              onRowClick: async (event, rowData) => {
                console.log(rowData)
            },
              render: rowData => {
                return (
                  <div>
                      <MaterialTable style={{border:"3px solid #067BFD"}} title='Sub Category' columns={subcolumn} data={rowData.products}
                       options={{
                        search: false,
                        toolbar:false,
                        paging:false,
                        actionsColumnIndex:-1
                      }}
                        ></MaterialTable>
                        <div className="amount">
                            <p>Total Amount:{rowData.totalPrice}</p>
                            <p>Discount Amount:{rowData.discountPrice}</p>
                            
                        </div>
                  </div>)}}]}
        options={{
            actionsColumnIndex: -1,
            showFirstLastPageButtons: false,
            pageSizeOptions: [5, 10, 20, 50],
            detailPanelColumnAlignment:'right',
            detailPanelColumnStyle:{width:'100px'}
        }}
        actions={[
            {
                icon: 'settings',
                tooltip: 'change status',
                onClick: async (event, rowData) => {
                    console.log(rowData)
                    
                }
            },
        ]}
    >
    </MaterialTable> 
    <Snackbar open={snackBarOpen} message="Successfully Deleted" 
    autoHideDuration={3500} onClose={handleCloseSnack}>

</Snackbar>
            </div>   :
    dbError ? 
    <div style={{width:'100%',height:'100px',marginTop:'300px'}} >
    
    <p style={{display:'block',marginLeft:'auto',
    marginRight:'auto',textAlign:'center'}}>Looks like Server Down!!
    <br/><a href="/orders">
    Try Reloading the page
    </a></p>
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
export default OrderList