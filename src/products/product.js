import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllProducts, deleteProduct, editProductFormatter } from './../services/productService'
import Snackbar from '@material-ui/core/Snackbar'
import NavBar from '../components/navBar';
import Table from './../components/table'
import SpinLoader from './../components/spinLoader'

export const Product = (props) => {
    const [product, setProduct] = useState(null)
    const [barOpen, setBarOpen] = useState(false)
    const [dbError, setDbError] = useState(false)
    const getProduct = async () => {
        const data = await getAllProducts()
        // console.log('p',data)
        if (!data) {
            setTimeout(() => {
                setDbError(true)
            }, 2000);
        }
        setProduct(data)
    }
    const handleClose = () => {
        setBarOpen(false
        )
    }
    const editable = {
        onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
            const id = selectedRow._id
            console.log(id)
            const data = await deleteProduct(id)
            if (data) {
                setBarOpen(true)
                getProduct()
                resolve()
            }
        })
    }
    const options = {
        actionsColumnIndex: -1,
        showFirstLastPageButtons: false,
        pageSize:7,
        pageSizeOptions: [7, 10, 20, 50],
        emptyRowsWhenPaging:false,
    }
    const actions = [{
        icon: 'edit',
        tooltip: 'Edit User',
        onClick: async (event, rowData) => {
            const edit = await editProductFormatter(rowData)
            // console.log("Edit", edit)
            props.history.replace({
                pathname: '/product/add',
                state: edit
            })
        }
    }]

    const columns = [{ title: "Product Name", field: 'name' },
    { title: "Brand Name", field: 'brand.brandName' },
    { title: 'Model Name', field: "manufactureDetails.modelName" },
    { title: "Category", field: 'category.name' },
    { title: "Sub Category", field: 'subCategory.name' },
    //  {title:"Variants",field:'variants.length'},
    // { title: "Images", field: 'gallery.length' },
    // { title: "Tags", field: 'tags.length' },
    {title:"Stock",field:'stock',
    render: rowData => {
        if (rowData.stock>11) {
            return (
                <p style={{textAlign:'center'}}>{rowData.stock}</p>
            )
        }
        else {
            return (
                <p style={{ margin:'4px',textAlign:'center',padding:"5px",backgroundColor:'red',
                    borderRadius:'20px', color: 'white', fontWeight: "bolder" }}>
                     {rowData.stock}</p>
            )
        }
    }},
    {title:"Price",field:'price'},
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
    useEffect(() => {
        getProduct()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (

        <div >
            <NavBar {...props}></NavBar>


            {product ?
                <div>
                    <div style={{ margin: '10px 20px' }}>
                        <Button onClick={() => { props.history.push('/product/add') }}>Add Product</Button>

                    </div>
                    <Table actions={actions} data={product} columns={columns} title="Products"
                        editable={editable} options={options} />
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

            <Snackbar open={barOpen} message="Successfully Deleted" autoHideDuration={3500} onClose={handleClose}>

            </Snackbar>
        </div>

    )
}
export default Product