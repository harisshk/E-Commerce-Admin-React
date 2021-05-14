import React, { useState ,useEffect} from 'react'
import {Modal,Form,Col,Button} from 'react-bootstrap'
import { updateTax ,addTax} from '../services/taxService'
export const TaxModal=(props)=>{
    const [validated,setValidated]=useState(false)
    const [dbError,setDbError]=useState(false)
    const [taxDetails,setTaxDetails]=useState({})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true){
            if(props.isEdit.isEdit){
            
                const data= await updateTax(props.isEdit.id,taxDetails)
                if(!data.error){
                    props.onHide()
                }
                else{
                    setDbError(true)
                }
            }
            else{
                const data= await addTax(taxDetails)
                if(!data.error){
                    props.onHide()
                }
                else{
                    setDbError(true)
                }
            }
        }
        else{
            setValidated(true);
           }
    }
    const handleValue=(field,value)=>{
        setTaxDetails({
            ...taxDetails,
            [field]:value
        })
    }
    useEffect(()=>{
        if(props.isEdit.isEdit){
            setTaxDetails(props.isEdit.data)
        }
        else{
            setTaxDetails({})
        }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
    return(
        <div>
            <Modal centered  {...props} >
                <Modal.Header closeButton>
                    Add Tax
        </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Tax Percentage</Form.Label>
                                <Form.Control required  type="number" onChange={(e)=>handleValue("tax",e.target.value)} value={taxDetails.tax}  placeholder="Enter Tax Percentage" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the tax percentage.
            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Country Name</Form.Label>
                                <Form.Control required  type="text" onChange={(e)=>handleValue("country",e.target.value)} value={taxDetails.country}  placeholder="Enter Country Name" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the country name.
            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Country Code</Form.Label>
                                <Form.Control required  type="text" onChange={(e)=>handleValue("countryCode",e.target.value)} value={taxDetails.countryCode} placeholder="Enter Country Code" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the Country Code.
            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Sate Name</Form.Label>
                                <Form.Control required  type="text" onChange={(e)=>handleValue("state",e.target.value)} value={taxDetails.state}  placeholder="Enter State Name" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the state name.
            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>State Code</Form.Label>
                                <Form.Control required  type="text" onChange={(e)=>handleValue("stateCode",e.target.value)} value={taxDetails.stateCode}  placeholder="Enter State Code" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the State Code.
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