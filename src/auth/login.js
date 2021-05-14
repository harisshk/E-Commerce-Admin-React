import React, { useEffect, useState } from "react";
import {Form,Button,InputGroup} from "react-bootstrap";
import "./login.css";
import {Login} from './../services/authserivce'
import { FaRegEye ,FaRegEyeSlash} from "react-icons/fa";

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
      const data = await Login({email,password})
      setSuccess(data)
      if(data){
        console.log("------------")
        props.history.push('/home')
      }
    }
    setValidated(true)
  }
  const [passwordShow,SetPasswordShow]=useState(false)
  const showPassword=()=>{
    SetPasswordShow(!passwordShow)
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
          <InputGroup.Append>   
    <Form.Control
            type={passwordShow?"text": "password"}
            placeholder="Enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      
      <Button variant="secondary" onClick={()=>showPassword()}>{!passwordShow?<FaRegEye />:<FaRegEyeSlash />}</Button>
    </InputGroup.Append>
        </Form.Group>
        <Button block size="lg" type="submit"  disabled={!validateForm()}>
          Login
        </Button>
        {!success &&<span style={{color:'red'}} disabled={success}>Inavlid credentials</span>
        }
      </Form>
    </div>
   </div>
  );
}

export default LoginPage