import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import {Login} from './../services/authserivce'
export const  LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(true);
  const [validated,setValidated]=useState(false)
  useEffect(()=>{
   
      // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  const formBox = {
    width: "450px",
    height: "360px",
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

  const  Loginhandler=async(e)=>{
    e.preventDefault();
    const form = e.currentTarget;
    if(form.checkValidity() === true){
      const data = await Login(email,password)
      setSuccess(data)
      if(data){
        props.history.push('/home')
      }
    }
    setValidated(true)
  }

  return (
   <div className="page">
      <div style={formBox}>
        <h4>Login</h4>
      <Form onSubmit={Loginhandler} noValidate validated={validated} >
        <Form.Group size="lg" controlId="email" >
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            placeholder="Enter the email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit"  disabled={!validateForm()}>
          Login
        </Button>
        <Button block size="lg" onClick={()=>{props.history.push('/signup')}}>
          signup
        </Button>
        {!success &&<span style={{color:'red'}} disabled={success}>Inavlid credentials</span>
}
      </Form>
    </div>
   </div>
  );
}

export default LoginPage