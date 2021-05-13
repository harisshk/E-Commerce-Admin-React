import React,{useState,useEffect} from 'react';
import {Button,Form,Row,Col} from 'react-bootstrap';
import {addDiscount,updateDiscount} from './../services/discountService'
import dateFormat from 'dateformat';
import Snackbar from '@material-ui/core/Snackbar'

export const DiscountForm=(props)=>{
    const formBox={
    width: "600px",
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
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
    }
    const [discount,setDiscount]=useState({})
    const [validated,setValidated]=useState(false)
    const [isEdit,setIsEdit]=useState(false)
    const setField=(field,value)=>{
        setValidated(false)
        setDiscount({
            ...discount,
            [field]:value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity() === true){
            console.log("=-=-=-==",discount)
            if(!isEdit){
                const data = await addDiscount(discount)
                if(!data.error){
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        props.history.push('/discount')
                    }, 400);
                
                }
            }
            else{
                const data = await updateDiscount(discount,props.location.state._id)
                if(!data.error){
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        props.history.push('/discount')
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
            setDiscount({
                ...discount,
                couponCount:props.location.state.couponCount,
                discountCode:props.location.state.discountCode,
                discountPercentage:props.location.state.discountPercentage,
                discountStartDate:dateFormat(props.location.state.discountStartDate, "yyyy-mm-dd"),
                discountEndDate:dateFormat(props.location.state.discountEndDate, "yyyy-mm-dd"),
                isActive:props.location.state.isActive
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div className='page'>
            
            <Button onClick={()=>{props.history.push('/discount')}}>Back</Button>
            <div style={formBox}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Discount Code</Form.Label>
                        <Form.Control required type="text" value={discount.discountCode} onChange={(e)=>setField("discountCode",e.target.value)}  placeholder="Enter discount code" />
                        <Form.Control.Feedback type="invalid">
                            Please Enter a discount code.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Discount Percentage</Form.Label>
                        <Form.Control required type="number" value={discount.discountPercentage} onChange={(e)=>setField("discountPercentage",e.target.value)}  placeholder="Enter discount percentage" />
                        <Form.Control.Feedback type="invalid">
                            Please Enter a Discounr percentage.
                        </Form.Control.Feedback>
                    </Form.Group >
                    <Form.Group as={Col}>
                        <Form.Label>Coupons Quantity</Form.Label>
                        <Form.Control required type="number" value={discount.couponCount} onChange={(e)=>setField("couponCount",e.target.value)}  placeholder="Enter discount code" />
                        <Form.Control.Feedback type="invalid">
                            Please Enter coupon quantity.
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Code Valid From</Form.Label>
                        <Form.Control required type="date" value={discount.discountStartDate}  onChange={(e)=>setField("discountStartDate",e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please Enter the discount start date.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Code Valid To</Form.Label>
                        <Form.Control required type="date" value={discount.discountEndDate} onChange={(e)=>setField("discountEndDate",e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            Please Enter the discount end date.
                        </Form.Control.Feedback>
                    </Form.Group>

                    </Row>
                    {isEdit  &&
                            
                            <Form.Group >
                                <Form.Check 
                                checked={discount.isActive === true}
                                    type="radio"
                                    label="Active"
                                    name="formHorizontalRadios"
                                    onChange={() => setField("isActive",true)}
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check 
                                  checked={discount.isActive === false}
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
export default DiscountForm