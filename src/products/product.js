import React,{useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import { Button,Spinner } from 'react-bootstrap';
import {getAllProducts,deleteProduct,editProductFormatter} from './../services/productService'
export const Product = (props) => {
    const [product,setProduct] = useState(null)
    const  getProduct = async()=>  {
            const data = await getAllProducts()
            // console.log('p',data)
            setProduct(data)
    }
    const columns=[{title:"Product Name",field:'name'},
                     {title:"Brand Name",field:'brand.brandName'},
                 {title:'Model Name',field:"manufactureDetails.modelName"},
                     {title:"Category",field:'category.name'},
                     {title:"Variants",field:'variants.length'},
                     {title:"Tags",field:'tags[0].tag'},
                    // {title:"Stock",field:'variants[0].stock'},
                    // {title:"Price",field:'variants[0].price'},
                    {title:"Is Active",field:'isActive',
                    render:rowData=>{
                        if(rowData.isActive){
                            return(
                                <p style={{color: 'green',fontWeight:"bolder"}}>Active</p>
                            )
                        }
                        else{
                            return(
                                <p style={{color: 'red',fontWeight:"bolder"}}>InActive</p>
                            )
                        }
                    }
                },
]
    useEffect(()=>{
        getProduct()
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
       
        <div style={{margin:'10px 20px'}}>
            <Button onClick={()=>{props.history.replace('/product/add')}}>Add Product</Button>
            
       {product ? 
       <MaterialTable style={{marginTop:'15px'}} title="Products" data={product} columns={columns} 
       actions={[
        {
          icon: 'edit',
          tooltip: 'Edit User',
          onClick:async (event, rowData) => {
              const edit = await editProductFormatter(rowData)
              console.log("Edit",edit)
              props.history.replace({
                pathname: '/product/add',
                state: edit 
              })
            }
        },
      ]}
       editable={{
            onRowDelete:selectedRow => new Promise((resolve,reject)=>{
                const id=selectedRow._id
                console.log(id)
                deleteProduct(id)
                setTimeout(()=>{
                    getProduct()
                    resolve()
                },2000)
            }),
       }}
       
         options={{
           actionsColumnIndex:-1,

           pageSizeOptions:[5,10,20,50]
       }} 
       
       >
        
            </MaterialTable>

          :<div style={{width:'100%',height:'100px',marginTop:'300px'
      }} >
            <Spinner  style={{display:'block',marginLeft:'auto',
          marginRight:'auto',height:'50px',width:'50px'}} animation="border" variant="primary" />
          <p style={{display:'block',marginLeft:'auto',
          marginRight:'auto',textAlign:'center'}}>Loading</p>
            </div>
        }     
        </div>

    )
}
export default Product