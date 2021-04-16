import React, { useState,useEffect } from 'react'
import MaterialTable from 'material-table'
import { getAllCategory } from './../services/categoryService'
import { Button,Spinner } from 'react-bootstrap'
import './categoryList.css'
import CategoryForm from './categoryForm'
export const CategoryList = (props) => {
    const [categoryList, setCategoryList] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [isEditCategory, setIsEditCategory] = useState(false)
    const [editCategory, setEditCategory] = useState([])

    const columns= [{ title: "Category Name", field: 'name' },
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



const modalOpen=()=> {

   setModalShow(true)

}
const modalClose=()=> {
    setModalShow(false)
    setIsEditCategory(false)

}
const onSave = async () => {
   setModalShow(false)
   getCategory()

}

const editActive=(data)=> {
    setEditCategory(data)
    console.log(data)
    setIsEditCategory(true)
    setModalShow(true)

}
const view=()=> {
    console.log('DB List', categoryList)
    console.log('Edit List',editCategory)
    console.log('isEdit', isEditCategory)
}
const getCategory=async()=>{
    const data = await getAllCategory()
    setCategoryList(data)
}
useEffect(()=>{
    getCategory()
 // eslint-disable-next-line react-hooks/exhaustive-deps      
},[props])

    return (
        <div>
            {categoryList?

                <div>
                    <Button style={{margin:'10px 30px'}} onClick={() => modalOpen()}>Add Category</Button>
<Button style={{margin:'5px 30px'}} onClick={() => props.history.push('/home')}>Back</Button>
{categoryList &&
    <div className='table'>
        <MaterialTable style={{ marginTop: '15px' }} title="Category" data={categoryList}
            columns={columns}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit User',
                    onClick: async (event, rowData) => {
                        editActive(rowData)
                    }
                },
            ]}
            editable={{
                onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
                    const id = selectedRow._id
                    console.log(id)
                }),
            }}
            options={{
                actionsColumnIndex: -1,
                showFirstLastPageButtons: false,
                pageSizeOptions: [5, 10, 20, 50]
            }}
        >
        </MaterialTable>
    </div>
}

<CategoryForm
    onHide={() => {
        modalClose()
    }}
    show={modalShow}
    onSave={() => {onSave() }}
    isEdit={isEditCategory}
    editCategory={editCategory}
></CategoryForm>
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
export default CategoryList