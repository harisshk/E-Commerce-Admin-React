import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export const Home = (props) =>{
    return(
        <Navbar bg="primary">
             <Button variant="primary">Home</Button>{'  '} 
            <Button variant="primary" onClick={()=>{
                props.history.push('/product')
            }}>Products</Button>
            <Button variant="primary" onClick={()=>{
                props.history.push('/category')
            }}>Category</Button>
            <Button variant="primary" onClick={()=>{
                props.history.push('/orders')
            }}>Orders</Button>
             <Button variant="primary" onClick={()=>{
                props.history.push('/tags')
            }}>Tags</Button>
        </Navbar>
        
    )
}
export default Home