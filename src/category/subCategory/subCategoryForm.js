import React, { useState,useEffect } from 'react'
import {Button,Form} from 'react-bootstrap'
import {getAllCategory,addSubCategory} from './../../services/categoryService'
export const SubCategoryForm=(props)=>{
    const [categoryList,setCategoryList]=useState(null)
    const [validated,setValidated]=useState(false)
    const [subCategory,setSubCategory]=useState({})
    const getCategory=async()=>{
        const data = await getAllCategory()
        if(data){
            setCategoryList(data)
        }
    }
    const setField=(field,value)=>{
        setSubCategory({
            ...subCategory,
            [field]:value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity() === true){
            const data = await addSubCategory(subCategory)
            if(data){
                props.history.push('/category')
            }
        }
        setValidated(true)
    }
    useEffect(()=>{
        getCategory()
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div><Button onClick={()=>{props.history.push('/category')}}>Back</Button>
        <div style={{ display: 'block',
  marginLeft:' auto',
  marginRight: 'auto',
  marginTop:'100px',
  width: '40%',
}}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group  >
                                <Form.Label>Sub Category Name</Form.Label>
                                <Form.Control required type="text" onChange={(e)=>{setField( 'subCategoryName',e.target.value)}} placeholder="Enter Sub Category Name" />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter a sub Category Name.
                                    </Form.Control.Feedback>

                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group  >
                                <Form.Label>Sub Category Name</Form.Label>
                                <Form.Control required as="select"  defaultValue=''onChange={(e)=>{setField('categoryId',e.target.value)}} >
                                <option value=''>Select a sub Category</option>
                                {categoryList && categoryList.map((team) => <option key={team._id} value={team._id}>{team.name}</option>)}

                            </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please Select a sub Category Type.
                                    </Form.Control.Feedback>

                            </Form.Group>
                            </Form.Row>
                            <Button type="submit" >Save</Button>
                            </Form>
            </div>       
        </div>
    )
}
export default SubCategoryForm