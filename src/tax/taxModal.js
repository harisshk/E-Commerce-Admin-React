import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
export const TaxModal=()=>{
    const [isEdit,setIsEdit]=useState(false)
    useEffect(()=>{
        
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
    return(
        <div>
            <Modal centered  {...props} >
                <Modal.Header closeButton>
                    Add Category
        </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Tag Name</Form.Label>
                                <Form.Control required  type="text"   placeholder="Enter Tag Name" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the tag name.
            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                     
                    
                              <Button type='submit'> {props.isEdit ? 'Update' : 'Save'}</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  {dbError &&   <p style={{color:'red'}}>Cannot { props.isEdit ? 'Update' : 'Save'} data</p>}

                    {/* <Button onClick={() => { view() }}>View</Button> */}
                    <Button onClick={() => {
                        props.onHide()

                    }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default TaxModal