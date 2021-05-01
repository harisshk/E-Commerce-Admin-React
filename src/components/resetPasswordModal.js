import { Button } from 'react-bootstrap'
import React, { useEffect } from 'react'
import {Modal} from 'react-bootstrap'
import {resetPassword} from './../services/adminService'

export const ResetPassword =(props)=>{
    const{onHide,show,id,name}=props
    const resetPasswordHandler=async()=>{
        const data = await resetPassword(id)
        if(!data.error){
            onHide()
        }
    }
    useEffect(()=>{
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

return(
    <Modal  centered onHide={onHide}  show={show} on >
                <Modal.Header closeButton>
                    Reset Password
                </Modal.Header>
                <Modal.Body>
                   Reset password for {name} ?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{resetPasswordHandler()}}>Confirm</Button>
                    <Button onClick={()=>{onHide()}}>Close</Button>
                </Modal.Footer>
            </Modal>
)
} 
export default ResetPassword