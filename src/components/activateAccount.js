import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import {Form, Modal,Col} from 'react-bootstrap'
import {updateAdmin} from './../services/adminService'

export const ActivateAccount =(props)=>{
    const {onHide,show,id}=props
    const [validated,setValidated]=useState(false)
    const [activateDetails,setActivateDetails]=useState({})
    const setField=(field,value)=>{
        setActivateDetails({
            ...activateDetails,
            [field]:value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity() === true){
            const data=await updateAdmin(activateDetails,id)
            if(!data.error){
                onHide()
            }
        }
        setValidated(true)
    }
    useEffect(()=>{
        setValidated(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
    return(
       <Modal centered onHide={onHide}  show={show}>
            <Modal.Header closeButton>
                    Activate Account
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Col}>
                            <Form.Label>Role</Form.Label>
                            <Form.Control required as="select"  defaultValue='' onChange={(e)=>setField("role",e.target.value)}>
                            <option value=''>Select the role</option>
                                <option value='Admin'>Admin</option>
                                <option value='Manager'>Manager</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                            Please Select the role.
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                                 <Form.Check 
                                    onChange={(e)=>setField("isActivated",e.target.checked)}
                                    required="true"
                                    type="checkbox"
                                    label="Activate Account"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                 />
                                
                         </Form.Group>
                         <Button type="submit">Save</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={()=>{onHide()}}>Close</Button> 
                </Modal.Footer>
       </Modal> 
    )
}
export default ActivateAccount