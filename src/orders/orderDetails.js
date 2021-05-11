import React, { useEffect ,useState} from 'react'
import NavBar from '../components/navBar'
import { Col, Row, Form } from 'react-bootstrap'
import Table from '../components/table'
import { Button } from 'react-bootstrap'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import {updateOrderStatus} from '../services/orderService'
export const OrderDetails = (props) => {
    const order = props.location.state
    console.log(order)
    const [status,setStatus]=useState(null)
    
    const orderDetails = {
        margin: "20px",
        marginLeft: "30px",
        backgroundColor: "#fff",

    }
    const update=async()=>{
        const data =await updateOrderStatus(status,{"orderId":order._id,
                                    "userId":order.user._id,
                                    "email":"order.user.email"})
        if(!data.error){
            setTimeout(() => {
                props.history.push("/orders/totalOrders")
            }, 500);
        }
    }
    const setField=(field,value)=>{
        setStatus({
            ...status,
            [field]:value
        })
    }
    useEffect(() => {
        setStatus({
            status:order.status
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [props])
    const subcolumn = [
        {
            title: "", field: '',
            render: rowData => {
                
                return (<img
                    src={rowData.product.gallery[0]}
                    height="100px"
                    width="100px"
                    alt="added_image"
                />)
            }
        },
        { title: "Products", field: 'product.name' },
        {
            title: "Unit Price", field: '',
            render: rowData => {
                return (<p>{rowData.product.price} $</p>)
            }
        },
        { title: "Quantity", field: 'quantity' },
        {
            title: "Total", field: '',
            render: rowData => {
                
                return (<p>{rowData.product.price * rowData.quantity} $</p>)
            }
        },
    ]
    return (
        <div style={{ backgroundColor: "#DFE6F1", minHeight: "100vh" }}>
            <NavBar />
            {status &&
            <Row style={{ width: "100%" }}>
            <Col xs={9}>
                <Row>
                    <Col style={orderDetails}>
                        <div style={{ padding: "10px" }}>
                            <Row><h3>Oder Details</h3></Row>
                            <Row><h4>Oder Number #{order.orderNo}</h4></Row>
                            <Row>
                                <Col>
                                    General Details
                      <Row>
                                        <Form>
                                           <Form.Group as={Col}>
                                                <Form.Label>Order Status</Form.Label>
                                                <Form.Control required as="select" defaultValue='' value={status.status}  onChange={(e)=>setField("status",e.target.value)}>
                                                    <option value='Payment Pending'>Payment Pending</option>
                                                    <option value='Processing'>Processing</option>
                                                    <option value='On Hold'>On Hold</option>
                                                    <option value='Completed'>Completed</option>
                                                    <option value='Cancelled'>Cancelled</option>
                                                    <option value='Refunded'>Refunded</option>

                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please  choose a Category.
        </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                </Col>
                                <Col style={{ margin: "0px", fontSize: "17px", padding: "0px" }}>
                                    Billing Details
                        <div>
                                        {order.address.name}<br />
                                        {order.address.address},<br />
                                        {order.address.town},<br />
                                        {order.address.city} - {order.address.pinCode}<br />
                                    </div><br />
                                    <b>Email:</b>{order.user.email}<br />
                                    <b>Phone:</b>{order.address.phoneNumber}
                                </Col>
                                <Col>
                                    Shipping Details
                      <div>
                                        {order.address.name}<br />
                                        {order.address.address},<br />
                                        {order.address.town},<br />
                                        {order.address.city} - {order.address.pinCode}<br />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ margin: "20px 20px 0 30px", backgroundColor: "#fff" }}>
                        <Table style={{ margin: "0", padding: "0px", borderBottom: "none" }} data={order.products} columns={subcolumn} options={{
                            search: false,
                            toolbar: false,
                            paging: false,
                            actionsColumnIndex: -1,
                            emptyRowsWhenPaging: false,
                        }} />
                        <Row>
                            <Col xs={8} />
                            <Col xs={2}><Row><div style={{ display: "" }}>
                                Order Total :
                        </div></Row>
                                <Row>Amount Paid :</Row>
                            </Col>
                            <Col xs={1}><Row>{order.totalPrice} $</Row>
                                <Row>{order.totalPricePayed} $</Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col xs={3}>
                <Row style={{ margin: "20px 0 0 5px", padding: "10px", backgroundColor: "#fff" }}>
                    <Col><Row>Order actions <br /></Row>
                    <Row><Form>
                                           <Form.Group as={Col}>
                                                <Form.Label>Order Status</Form.Label>
                                                <Form.Control required as="select" defaultValue='' >
                                                    <option value='orderCreated'>Mail user the new order</option>
                                                    <option value='Processing'>Processing</option>
                                                    <option value='On Hold'>On Hold</option>
                                                    <option value='Completed'>Completed</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please  choose a Category.
        </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form></Row>
                        <Button onClick={()=>update()}>Update</Button><br />
                        <Button onClick={()=>{props.history.replace("/orders/totalOrders")}}>Back</Button><br />
                        <Button onClick={()=>console.log(status)}>View</Button></Col>
                </Row>
                <Row style={{ margin: "20px 0 0 5px", padding: "10px", backgroundColor: "#fff" }}>
                    <Col>
                        <Row>Order Log</Row>
                        <Row>
                        <Timeline>
                                {order.orderLog.map((result)=>
                                <TimelineItem>
                                    <TimelineOppositeContent>
                                        <Typography color="textSecondary">{result.time.slice(3,16,1)}
                                        {result.time.slice(16,21,1)}</Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                    <TimelineDot variant="outlined" color="primary" />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography>{result.log}</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                )}
                                 </Timeline>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
            }
        </div>
    )
}
export default OrderDetails