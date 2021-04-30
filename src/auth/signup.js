import React,{useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import {createAdmin} from './../services/adminService'
export const SignUp = (props) => {
    const [details,setDetails]=useState({})
    const [validated,setvalidated]=useState(false)
    const formBox = {
        width: "450px",
        height: "450px",
        position: "absolute",
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        top: 0,
        bottom: 0,
        padding: "20px",
        borderRadius: "30px",
        margin: "auto",
        maxWidth: "100%",
        maxHeight: "100%"
    }
    const setField = (field,value)=>{
        setDetails({
            ...details,
            [field]:value
        })
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity() === true){
            console.log("khk")
            const data = await createAdmin(details)
            if(!data.error){
                props.history.push('/')
            }
        }
        setvalidated(true)
    }
    return (
        <div className="page">
            <div style={formBox}>
                <h4>SignUp</h4>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" required onChange={(e)=>{setField("name",e.target.value)}} placeholder="Enter your full name" >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please Enter your full name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required onChange={(e)=>{setField("email",e.target.value)}} placeholder="Enter your Email">
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please Enter the email in valid format.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required onChange={(e)=>{setField("password",e.target.value)}} placeholder="Enter your Password" >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please Enter your password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    )
}
export default SignUp