import React from 'react'
import NavBar from '../components/navBar'
import jwt_decode from "jwt-decode";

export default function Profile(props){
  var decoded = jwt_decode(localStorage.getItem("token"));
  console.log(decoded)

  return(
    <div>
      <NavBar />
    </div>
  )
}