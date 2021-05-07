import React, { useState } from 'react'
import NavBar from './../components/navBar'
import Table from './../components/table'
import {Button} from 'react-bootstrap'
export const TaxList=()=>{
    const [modalShow,setModalShow]=useState(false)
    const columns=[
        {title:"Country"}
    ]
    const open=()=>{

    }
    return(
        <div>
             <NavBar></NavBar>
             <div style={{ margin: '30px' }}>
                    <Button onClick={() => { open() }}>Add Tax</Button>
                    <Table  title="Tax"   style={{ margin:'5px 50px' }} columns={columns} />
                    </div>
        </div>
    )
} 
export default TaxList