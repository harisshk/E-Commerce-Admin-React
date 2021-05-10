import React,{useEffect,useState} from 'react'
import Table from './../components/table'
import {getAllDiscount,deleteDiscount} from './../services/discountService';
import {Button} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar'
import SpinLoader from './../components/spinLoader'
import NavBar from './../components/navBar'
import dateFormat from 'dateformat';
import Reload from './../components/reload'
export const DiscountList=(props)=>{
    const [discount,setDiscount]=useState(null)
    const [dbError,setDbError]=useState(false)
    const getDiscount=async()=>{
        const data = await getAllDiscount()
        if(!data.error){
            setDiscount(data.data)
        }
        else{
            setDbError(true)
        }
    }
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
    }
    const column=[
        {title:"Discount Code",field:"discountCode"},
        {title:"Discount Percentage",field:"discountPercentage",
    render:rowData=>{
        return(
            <p >{rowData.discountPercentage} %</p>
        )
    }},
    {title:"Code Quantity",field:"couponCount"},
    {
        title: "Valid From", field: 'discountStartDate',
        render: rowData => {
            return (
                <div><p>{dateFormat(rowData.discountStartDate, "mmmm dS, yyyy ")}</p></div>
            )
        }
    },
    {
        title: "Valid To", field: 'discountEndDate',
        render: rowData => {
            return (
                <div><p>{dateFormat(rowData.discountEndDate, "mmmm dS, yyyy ")}</p></div>
            )
        }
    },
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
    const options ={
        actionsColumnIndex: -1,
        showFirstLastPageButtons: false,
        pageSize:10,
        pageSizeOptions: [10, 20, 50],
        emptyRowsWhenPaging:false,

    }
    const actions=[
        {
            icon: 'edit',
            tooltip: 'Edit Tag',
            onClick: async (event, rowData) => {
                props.history.replace({
                    pathname: '/discount/add',
                    state: rowData
                })
            }
        }
    ]
    const editable={
        onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
            const id = selectedRow._id
            const data = await deleteDiscount(id)
            if (data) {
                setSnackBarOpen(true)
                getDiscount()
                resolve()
            }
        }),
    }
    useEffect(() => {
        getDiscount()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div><NavBar />
            {discount ?
                <div>
                    <div style={{ margin: '10px 20px' }}>
                        <Button onClick={() => { props.history.push('/discount/add') }}>Add Discount</Button>
                    </div>
                    <Table data={discount} editable={editable} actions={actions} options={options} title={"Discount"} columns={column} style={{margin:"0px 200px"}}/>
                </div>
                :
                dbError ?
                   <Reload href={"/discount"} />
                    :
                    <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >
                        <SpinLoader />
                        <p style={{
                            display: 'block', marginLeft: 'auto',
                            marginRight: 'auto', textAlign: 'center'
                        }}>Loading</p>
                    </div>

            }

<Snackbar open={snackBarOpen} message="Successfully Deleted" 
    autoHideDuration={3500} onClose={handleCloseSnack} />
        </div>
    )
}
export default DiscountList