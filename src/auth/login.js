import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import {Login} from './../services/authserivce'
export const  LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function Loginhandler(email,password){
      setSuccess(Login(email,password))
      console.log(success)
       if (!success){
        props.history.push('/home')
        console.log(props.history)
       }
  }

  return (
    <div className="Login">
      <Form >
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" onClick={()=>{Loginhandler(email,password)}} disabled={!validateForm()}>
          Login
        </Button>
        {success &&<span style={{color:'red'}} disabled={success}>Inavlid credentials</span>
}
      </Form>
    </div>
  );
}

export default LoginPage