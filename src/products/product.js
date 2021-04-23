import React,{useEffect, useState} from 'react';
import MaterialTable from 'material-table'
import { Button,Spinner, } from 'react-bootstrap';
import {getAllProducts,deleteProduct,editProductFormatter} from './../services/productService'
import Snackbar from '@material-ui/core/Snackbar'
import NavBar from '../components/navBar';

export const Product = (props) => {
    const [product,setProduct] = useState(null)
    const [barOpen,setBarOpen]= useState(false)
    const [dbError,setDbError]= useState(false)
    const  getProduct = async()=>  {
            const data = await getAllProducts()
            // console.log('p',data)
            if(!data){
                setTimeout(() => {
                    setDbError(true)
                }, 2000);
            }
            setProduct(data)
    }
    const handleClose=()=>{
        setBarOpen(false
            )
    }
   
    const columns=[{title:"Product Name",field:'name'},
                     {title:"Brand Name",field:'brand.brandName'},
                 {title:'Model Name',field:"manufactureDetails.modelName"},
                     {title:"Category",field:'category.name'},
                     {title:"Sub Category",field:'subCategory.name'},
                    //  {title:"Variants",field:'variants.length'},
                     {title:"Images",field:'gallery.length'},
                     {title:"Tags",field:'tags.length'},
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
      
        <div >
             <NavBar {...props}></NavBar>
           
            
       {product ? 
       <div>
           <div style={{margin:'10px 20px'}}>
       <Button onClick={()=>{props.history.push('/product/add')}}>Add Product</Button> 
      
          </div>
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
            onRowDelete:selectedRow => new Promise(async(resolve,reject)=>{
                const id=selectedRow._id
                console.log(id)
                const data = await deleteProduct(id)
                if(data){
                    setBarOpen(true)
                    getProduct()
                    resolve()
                }
            }),
       }}
       
         options={{
           actionsColumnIndex:-1,
            showFirstLastPageButtons:false,
           pageSizeOptions:[5,10,20,50]
       }} 
       
       >
        
            </MaterialTable>

       </div>
          :
              dbError ? 
              <div style={{width:'100%',height:'100px',marginTop:'300px'}} >
              
            <p style={{display:'block',marginLeft:'auto',
            marginRight:'auto',textAlign:'center'}}>Looks like Server Down!!
             <br/><a href="/product">
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
             
        <Snackbar open={barOpen} message="Successfully Deleted" autoHideDuration={3500} onClose={handleClose}>
        
      </Snackbar>
        </div>

    )
}
export default Product