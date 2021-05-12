import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import {Form, Modal,Col} from 'react-bootstrap'

export const OrderStausModal =(props)=>{
    const{onHide,show,value,isDelivered,onUpdate}=props
    
    const [orderStatus,setOrderStatus]=useState({
        status:'',
        isDelivered:null
    })
    const setField=(field,value)=>{
        
        if(value==="Cancelled"){
            setOrderStatus({
                ...orderStatus,
                [field]:value,
                isCancelled:true
            })
        }
        else if (value==="Completed"){
            setOrderStatus({
                ...orderStatus,
                [field]:value,
                isDelivered:true
            })
        }
        else{
            setOrderStatus({
                ...orderStatus,
                [field]:value
            })
        }
     }
    const updateStatus=()=>{
        onUpdate(orderStatus)

        // console.log(orderStatus)
    }
    useEffect(()=>{
        setOrderStatus({
            status:value,
            isDelivered:isDelivered
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

return(
    <Modal  centered onHide={onHide}  show={show} on >
                <Modal.Header closeButton>
                    Add Category
                </Modal.Header>
                <Modal.Body>
                    <Form >
                    {
                        <Form.Group as={Col}>
                        <Form.Label>Order Status</Form.Label>
                        <Form.Control required as="select"  defaultValue='' value={orderStatus.status} onChange={(e) => setField( 'status',e.target.value)}  >
                        <option value='Payment Pending'>Payment Pending</option>
                                                <option value='Processing'>Processing</option>
                                                <option value='On Hold'>On Hold</option>
                                                <option value='Completed'>Completed</option>
                                                <option value='Cancelled'>Cancelled</option>
                                                <option value='Refunded'>Refunded</option>
                        </Form.Control>
                    </Form.Group>
                    }
                        {/* <Form.Group as={Col} >
                                 <Form.Check 
                                  checked={orderStatus.isDelivered === true}
                                     type="radio"
                                     label="Delivered"
                                     name="formHorizontalRadios"
                                     onClick={() => setField( 'isDelivered',true)}
                                     id="formHorizontalRadios1"
                                 />
                                 <Form.Check 
                                   checked={orderStatus.isDelivered === false}
                                     type="radio"
                                     label="Not Delivered"
                                     onClick={() => setField( 'isDelivered',false)}
                                     name="formHorizontalRadios"
                                     id="formHorizontalRadios2"
                                 />
                             
                         </Form.Group> */}
                        <Button onClick={()=>{updateStatus()}}>Update</Button>
                    </Form>
                   
                </Modal.Body>
            </Modal>
)
} 
export default OrderStausModal