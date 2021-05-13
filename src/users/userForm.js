import React,{useState,useEffect} from 'react';
import {Button,Form} from 'react-bootstrap';
import {createAdmin,updateAdmin} from './../services/adminService'
import Snackbar from '@material-ui/core/Snackbar'

export const UserForm=(props)=>{
    const formBox={
    width: "450px",
    height: "420px",
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
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
    }
    const [user,setUser]=useState({})
    const [validated,setValidated]=useState(false)
    const [isEdit,setIsEdit]=useState(false)
    const setField=(field,value)=>{
        setUser({
            ...user,
            [field]:value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity() === true){
           
            if(!isEdit){ console.log("=-=-=-==",user)
                const data = await createAdmin(user)
                if(!data.error){
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        props.history.push('/users')
                    }, 400);
                
                }
            }
            else{
                const data = await updateAdmin(user,props.location.state._id)
                if(!data.error){
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        props.history.push('/users')
                    }, 400);
                }
            }
        }
        else{
            setValidated(true);
           }
    }
    useEffect(() => {
        console.log(props.location.state)
        if(props.location.state){
            setIsEdit(true)
            setUser(props.location.state)
        }else{
            setIsEdit(false)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div className='page'>
            
            <Button onClick={()=>{props.history.push('/users')}}>Back</Button>
            <div style={formBox}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group >
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control required type="text" value={user.name} onChange={(e)=>setField("name",e.target.value)}  placeholder="Enter the full name" />
                        <Form.Control.Feedback type="invalid">
                            Please Enter the full name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" value={user.email} onChange={(e)=>setField("email",e.target.value)}  placeholder="Enter the email" />
                        <Form.Control.Feedback type="invalid">
                            Please Enter the mail in valid format.
                        </Form.Control.Feedback>
                    </Form.Group >
                    <Form.Group >
                        <Form.Label>Role</Form.Label>
                        <Form.Control required as="select" value={user.role} defaultValue=''  onChange={(e) => setField( 'role',e.target.value)}  >
                        <option value=''>Select the role</option>
                                <option value='Admin'>Admin</option>
                                <option value='Manager'>Manager</option>
                            </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please select the role.
                        </Form.Control.Feedback>
                    </Form.Group>
                    {isEdit  &&
                            <Form.Group >
                                <Form.Label>Active</Form.Label>
                                <Form.Check 
                                checked={user.isActive === true}
                                    type="radio"
                                    label="Active"
                                    name="formHorizontalRadios"
                                    onChange={() => setField("isActive",true)}
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check 
                                  checked={user.isActive === false}
                                    type="radio"
                                    label="InActive"
                                    onChange={() => setField("isActive",false)}
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />
                            
                        </Form.Group>
                           }
                <Button  type="submit">{isEdit?"Update":"Save"}</Button>{' '}
                <Button onClick={()=>{props.history.push('/discount')}}>Close</Button>
            </Form>
            <Snackbar open={snackBarOpen} message={isEdit?"Successfully Updated":"Successfully Added"} 
            autoHideDuration={2000} onClose={handleCloseSnack}></Snackbar>
            </div>
        </div>
    )
}
export default UserForm