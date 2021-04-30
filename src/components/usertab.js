import React from 'react';
import { Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function UserTab() {

  return (
    <div >
     
      <Navbar bg="light">
            <Link  to='/users'>
                <Button  variant="outline-primary">
                    Users
                </Button> 
            </Link>
            
            <Link to='/users/activate'>
                <Button variant="outline-primary">
                    Activate Account
                </Button>
            </Link>

        </Navbar>
    </div>
  );
}
