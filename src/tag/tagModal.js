import React, { useState } from 'react'
import { Button, Modal, Form, Col } from 'react-bootstrap'
import {addTag} from './../services/tagService'

export const TagModal = (props) => {
    const [validated, setValidated] = useState(false)
    const [tagName,setTagName]=useState('')
    const setField =(value)=>{
        setTagName(
            value
        )
    }
    const handleSubmit = async (e) => {
        e.stopPropagation()
        const form = e.currentTarget;
        if (form.checkValidity() === true){
            if(!props.isEdit){
                console.log(addTag(tagName))
            }
        }
        else{
            console.log("not valid")
        }
        e.preventDefault();
        setValidated(true)
    }
    return (
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
                                <Form.Control required type="text"  onChange={(e) => setField( e.target.value)} placeholder="Enter Tag Name" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the tag name.
            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button type='submit'> {props.isEdit ? 'Update' : 'Save'}</Button>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    {/* <p style={{color:'red'}}>Cannot { props.isEdit ? 'Update' : 'Save'} data</p> */}

                    {/* <Button onClick={() => { view() }}>View</Button> */}
                    <Button onClick={() => {
                        props.onHide()

                    }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default TagModal