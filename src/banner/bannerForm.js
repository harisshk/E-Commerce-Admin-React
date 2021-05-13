import { Button, Form, } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { updateBanner, addBanner } from '../services/bannerService'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert';

export const BannerForm = (props) => {
    const [validated, setValidated] = useState(false)
    const [banner, setBanner] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const addformBox = {
        width: "450px",
        height: "380px",
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
    const updateformBox = {
        width: "450px",
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
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [snackBar, setSnackBar] = useState(false)

    const handleCloseSnack = () => {
        setSnackBarOpen(false)
    }
    const setField = (field, value) => {
        setBanner({
            ...banner,
            [field]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {

            if (!isEdit) {
                console.log("=-=-=-==", banner)
                const data = await addBanner(banner)
                if (!data.error) {
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        props.history.replace("/banner")
                    }, 1000);
                }
                else {
                    setSnackBar(true)
                    setTimeout(() => {
                        setSnackBar(false)
                    }, 3000);

                }
            }
            else {
                const data = await updateBanner(banner)
                if (!data.error) {
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        props.history.replace("/banner")
                    }, 1000);
                }
                else {
                    setSnackBar(true)
                    setTimeout(() => {
                        setSnackBar(false)
                    }, 3000);
                }
            }
        }
        else {
            setValidated(true);
        }


    }
    useEffect(() => {
        if (props.location.state) {
            setBanner(props.location.state)
            setIsEdit(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="page">
            <Button onClick={() => props.history.push("/banner")}>Back</Button>
            <div style={isEdit?updateformBox:addformBox}>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group >
                        <Form.Label>Banner Name</Form.Label>
                        <Form.Control required type="text" value={banner.title} onChange={(e) => setField("title", e.target.value)} placeholder="Enter the banner name" />

                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Banner Url</Form.Label>
                        <Form.Control required type="text" value={banner.bannerImage} onChange={(e) => setField("bannerImage", e.target.value)} placeholder="Enter the banner url" />

                    </Form.Group >
                    <Form.Group>
                        {banner.bannerImage ? < img
                            src={banner.bannerImage}
                            height="100px"
                            width="100px"
                            alt="added_image"
                        /> :
                            <div style={{ height: "100px" }}></div>
                        }</Form.Group>
                    {isEdit &&
                        <Form.Group >
                            <Form.Label>Active</Form.Label>
                            <Form.Check
                                checked={banner.isActive === true}
                                type="radio"
                                label="Active"
                                name="formHorizontalRadios"
                                onChange={() => setField("isActive", true)}
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                checked={banner.isActive === false}
                                type="radio"
                                label="InActive"
                                onChange={() => setField("isActive", false)}
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />

                        </Form.Group>
                    }
                    <Button type="submit">{isEdit ? "Update" : "Save"}</Button>{' '}
                    <Button onClick={() => { props.history.push('/banner') }}>Close</Button>
                </Form>
            </div>
            <Snackbar open={snackBarOpen} message={isEdit ? "Successfully Updated" : "Successfully Added"}
                autoHideDuration={2000} onClose={handleCloseSnack}>
            </Snackbar>
            <Snackbar open={snackBar} message="DB Error" color='red'
                autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert severity="error">Error in {isEdit ? "updating" : "adding"} banner !</Alert>

            </Snackbar>
        </div>

    )
}
export default BannerForm