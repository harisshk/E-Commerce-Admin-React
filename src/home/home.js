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
        </Navbar>
        
    )
}
export default Home