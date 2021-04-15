import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import { getAllCategories, getAllTags, addProduct, editProduct } from './../services/productService'
import { VariantForm } from './variantForm'
import MaterialTable from 'material-table'
import { addTag } from './../services/tagService'
import Snackbar from '@material-ui/core/Snackbar'

export const ProductForm = (props) => {
    
    const styles = {
        margin: "20px 50px"
    }
    const columns = [{ title: "Color", field: 'color' },
    { title: "Size", field: 'size' },
    { title: "Price", field: 'price' },
    { title: "Stock", field: 'stock' },
    ]
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const handleCloseSnack=()=>{
        setSnackBarOpen(false)
    }
    const [editImage, setEditImage] = useState([])
    const [editVariant, setEditVariant] = useState({})
    const [tag, setTag] = useState([])
    const [tagNew, setTagNew] = useState([])
    const [tagInput, setTagInput] = useState('')
    const [isVariantEdit, setIsVariantEdit] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);
    const [category, setCategory] = useState(null)
    const [variant, setVariant] = useState([])
    const [variantId, setVariantId] = useState([])
    const [formf, setForm] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [tagId, setTagId] = useState([])
    const [nullTag, setNullTag] = useState(false)
    const [tagRequired, setTagRequired] = useState(false)
    // const {edit} = props.location.state
    const getValues = async () => {

        try {
            const category = await getAllCategories()
            setCategory(category)
            const tag = await getAllTags()
            if (props.location.state) {
                setTagId(props.location.state.tagId)

                const data = await tag.filter(item => {
                    return props.location.state.tagId.indexOf(item._id) === -1
                })
                setTag(data)
            }
            else {

                setTag(tag)
            }



        }
        catch (err) {
            console.log(err)

        }
        if (!props.location.state) {

            setIsEdit(false)
        }
        else {
            setForm(props.location.state)
            setVariant(props.location.state.variants)

            setTagNew(props.location.state.tags)
            setVariantId(props.location.state.variantId)
            setIsEdit(true)
        }
    }
    useEffect(() => {
        getValues()
        setVariantRequired(false)
        setTagRequired(false)
        setValidated(false)
        setStoreError(false)


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // const tageditor=async(data)=>{
    //    setTag(data)
    // }
    const dataChooser = () => {

        return variant
    }
    const setField = (field, value) => {
        setForm({
            ...formf,
            [field]: value
        })
    }
    const tagEvent = (e) => {
        setTagInput(
            e
        )
        setNullTag(false)

    }
    // const view = ()=>{
    //     console.log('newtag',tagNew)
    //     console.log('tagid',tagId)
    //     console.log('oldtag',tag)
    // }
    const ss = (data) => {
        setVariantRequired(false)
        setVariant(
            data
        )
        setModalShow(false)
    }
    const s = (data) => {
        setVariantRequired(false)
        // console.log('Updated',data)
        setVariant([
            ...variant,
            data
        ])
        setVariantId([
            ...variantId,
            data._id])
        setModalShow(false)
    }
    const addTagHandler = async () => {
        if (tagInput !== '') {
            const data = await addTag(tagInput)
            setTagNew([
                ...tagNew,
                data
            ])
            setTagId([
                ...tagId,
                data._id
            ])
            setTagInput('')
            setNullTag(false)
        }
        else {
            setNullTag(true)
        }
    }
    const reduceTag = (id) => {
        setTagId([
            ...tagId,
            id
        ])
        setTag(tag.filter(item => item._id !== id))
    }
    const popTag = (id) => {
        setTagId(tagId.filter(item => item !== id))
        setTagNew(tagNew.filter(item => item._id !== id))
    }
    const [validated, setValidated] = useState(false);
    const [storeError, setStoreError] = useState(false);
    const [variantRequired, setVariantRequired] = useState(false)
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (tagId.length !== 0 && variantId.length !== 0 && form.checkValidity() === true) {

            event.preventDefault();
            setVariantRequired(false)
            setTagRequired(false)
            if (isEdit) {
                // console.log('update')
                const data = await editProduct(formf, props.location.state.id, variantId, tagId)
                if (data) {
                    console.log('hi')
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        props.history.push('/product/')
                      
                    }, 1000);                   
                }
                else {
                    setStoreError(true)
                }
            }
            else {

                const data = await addProduct(formf, variantId, tagId)
                if (data) {
                    setSnackBarOpen(true)
                    setTimeout(() => {
                        props.history.push('/product')
                        
                    }, 1000);
                   
                }
                else {
                    setStoreError(true)
                }
            }
        }
        else if (variantId.length !== 0 && tagId.length !== 0) {
            setVariantRequired(false)
            setTagRequired(false)
            event.preventDefault();
        }
        else if (tagId.length !== 0) {
            setVariantRequired(false)
            setTagRequired(true)
            event.preventDefault();
        }
        else {
            event.preventDefault();
            setTagRequired(false)
            setVariantRequired(true)
        }
        setValidated(true);
    };


    return (
        <div>{!isEdit && <p>Add Product</p>}
            {isEdit && <p>Update Product</p>}
            <Button style={{ margin: '0px 5px' }} onClick={() => {
                props.history.push('/product')
            }}>
                Back
                    </Button>
            {/* <Button onClick={()=>{view()}}>view</Button> */}
            {!category && !tag &&
                <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >
                    <Spinner style={{
                        display: 'block', marginLeft: 'auto', height: '50px', width: '50px',
                        marginRight: 'auto'
                    }} animation="border" variant="primary" />
                    <p style={{
                        display: 'block', marginLeft: 'auto',
                        marginRight: 'auto', textAlign: 'center'
                    }}>Loading</p>
                </div>
            }
            {category && tag &&
                <Form style={styles} noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>

                        <Form.Group as={Col} >
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control required type="text" value={formf.name} onChange={(e) => setField('name', e.target.value)} placeholder="Enter Product Name" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter a Product Name.
            </Form.Control.Feedback>

                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control required type="text" value={formf.brandName} onChange={(e) => setField('brandName', e.target.value)} placeholder="Enter Brand Name" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter a Brand Name.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control required as="select" value={formf.category} defaultValue='' onChange={e => setField('category', e.target.value)}>
                                <option value=''>Select a Category</option>
                                {category.map((team) => <option key={team._id} value={team._id}>{team.name}</option>)}

                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please  choose a Category.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col}>
                            <Form.Label>Short Desription</Form.Label>
                            <Form.Control required type="text" value={formf.shortDescription} onChange={(e) => setField('shortDescription', e.target.value)} placeholder="Enter Short Description" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter short description.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Desription</Form.Label>
                            <Form.Control required type="text" value={formf.description} onChange={(e) => setField('description', e.target.value)} placeholder="Enter Description" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter description.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>

                        <div style={{ margin: '0px', width: '200px' }}>
                            <Form.Group as={Col}>
                                <Form.Label>Tag</Form.Label>
                                <Form.Control type="text" value={tagInput}
                                    onChange={(e) => tagEvent(e.target.value)} placeholder="Enter Description" />
                                {nullTag && <p style={{ color: 'red' }}>Null valuues are not accepted</p>}
                                <Button onClick={() => addTagHandler()}>Add</Button>
                                <Form.Control.Feedback type="invalid">
                                    Please Enter description.
            </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div style={{ width: '200px' }}>
                            <Form.Group as={Col}>
                                <h4>Tags Applied</h4>
                                <div style={{
                                    border: '1px solid #000', height: '200px', width: '170px',
                                    maxHeight: '200px', overflow: 'auto'
                                }}>
                                    <ul style={{ padding: '10px', display: 'flex', flexWrap: 'wrap' }}>
                                        {tagNew && tagNew.map((value, index) => (
                                            <li key={index} style={{
                                                width: '100%', height: ' 32px', display: 'flex', alignItems: ' center',
                                                justifyContent: 'center', color: '#fff',
                                                fontSize: ' 14px',
                                                listStyle: 'none',
                                                borderRadius: '6px',
                                                margin: '5px 10px',
                                                background: '#0052cc'
                                            }}>
                                                <span style={{ marginTop: '3px' }}>{value.tag}</span>
                                                <span
                                                    onClick={() => {
                                                        setTag([...tag, value])
                                                        popTag(value._id)
                                                    }}
                                                    style={{
                                                        width: '16px', height: '16px', display: 'block',
                                                        lineHeight: '16px', fontSize: '14px',
                                                        textAlign: 'center', position: 'relative', right: '-10px',
                                                        color: ' #0052cc',
                                                        borderRadius: '50%', background: '#fff', cursor: 'pointer'
                                                    }}
                                                >
                                                    -
						</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {tagRequired && <p style={{ color: 'red' }}>Atleast one tag is required</p>}

                                </div>
                            </Form.Group>
                        </div>
                        <div style={{ width: '200px' }}>
                            <Form.Group as={Col}>
                                <h4>Tags availabe</h4>
                                <div style={{
                                    border: '1px solid #000', height: '200px', width: '170px',
                                    maxHeight: '200px', overflow: 'auto'
                                }}>

                                    <ul style={{ padding: '10px', display: 'flex', flexWrap: 'wrap' }}>
                                        {tag && tag.map((tag, index) => (
                                            <li key={index} style={{
                                                width: 'auto', height: ' 32px', display: 'flex', alignItems: ' center',
                                                justifyContent: 'center', color: '#fff', padding: ' 0 8px',
                                                fontSize: ' 14px',
                                                listStyle: 'none',
                                                borderRadius: '6px',
                                                margin: '0 8px 8px 0',
                                                background: '#0052cc'
                                            }}>
                                                <span style={{ marginTop: '3px' }}>{tag.tag}</span>
                                                <span
                                                    onClick={() => {
                                                        setTagNew([...tagNew, tag])
                                                        reduceTag(tag._id)
                                                    }}
                                                    style={{
                                                        display: 'block', flexDirection: 'row-reverse', width: '16px', height: '16px',
                                                        lineHeight: '16px', textAlign: 'center', fontSize: '14px',
                                                        marginLeft: '8px', color: ' #0052cc', alignItems: 'right',
                                                        borderRadius: '50%', background: '#fff', cursor: 'pointer'
                                                    }}
                                                >
                                                    +
						</span>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </Form.Group>
                        </div>
                        <div style={{ width: '500px' }}>
                            {/* <Button onClick={()=>{view()}}>vIeew</Button> */}
                            <Form.Group as={Col} style={{ paddingLeft: '10px', alignItems: 'center' }}>

                                <div style={{ margin: '5px' }}>

                                    <Button variant="primary" onClick={() => {
                                        setEditVariant({})
                                        setEditImage([])
                                        setTimeout(() => {
                                            setIsVariantEdit(false)
                                            setModalShow(true)
                                        }, 1);

                                    }

                                    }>
                                        Add Variants
                              </Button>
                                    {variantRequired && <p style={{ color: 'red' }}>Atleast one variant is required</p>}
                                </div>


                                <div >
                                    {<MaterialTable title='Variants' data={dataChooser()}
                                        columns={columns}
                                        options={
                                            {

                                                paging: false, actionsColumnIndex: -1
                                            }
                                        }
                                        actions={[
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit Variant',
                                                onClick: async (event, rowData) => {
                                                    setEditImage(rowData.gallery)
                                                    setEditVariant(rowData)
                                                    setIsVariantEdit(true)
                                                    setModalShow(true)
                                                }
                                            },
                                        ]}
                                        editable={{
                                            onRowDelete: selectedRow => new Promise((resolve, reject) => {
                                                const id = selectedRow._id

                                                setVariantId(variantId.filter(item => item !== id))
                                                setVariant(variant.filter(item => item._id !== id));
                                                setTimeout(() => {
                                                    resolve()
                                                }, 1200)
                                            }),
                                        }}>
                                    </MaterialTable>}
                                </div>
                                <VariantForm
                                    variant={variant}
                                    updatevariant={(data) => { ss(data) }}
                                    show={modalShow}
                                    editVariant={editVariant}
                                    editImage={editImage}
                                    onHide={() => setModalShow(false)}
                                    onSave={(data) => { s(data) }}
                                    edit={isVariantEdit}
                                />
                            </Form.Group>
                        </div>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Dimensions :</Form.Label>
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} >
                            <Form.Label>Height</Form.Label>
                            <Form.Control required type="text" value={formf.height} onChange={(e) => setField('height', e.target.value)} placeholder="Enter Height" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter height of the product.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Width</Form.Label>
                            <Form.Control required type="text" value={formf.width} onChange={(e) => setField('width', e.target.value)} placeholder="Enter Width" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter width of the product.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Depth</Form.Label>
                            <Form.Control required type="text" value={formf.depth} onChange={(e) => setField('depth', e.target.value)} placeholder="Enter Depth" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter depth of the product.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Weight</Form.Label>
                            <Form.Control required type="text" value={formf.weight} onChange={(e) => setField('weight', e.target.value)} placeholder="Enter Weight" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter weight of the product.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Warranty</Form.Label>
                            <Form.Control required type="text" value={formf.warranty} onChange={(e) => setField('warranty', e.target.value)} placeholder="Enter waranty details" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter the warranty details.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Replacement Policy</Form.Label>
                            <Form.Control required type="text" value={formf.replacementPolicy} onChange={(e) => setField('replacementPolicy', e.target.value)} placeholder="Enter Replacement Policy" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter the replacement policy.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Additional Information</Form.Label>
                            <Form.Control required type="text" value={formf.additionalInformation} onChange={(e) => setField('additionalInformation', e.target.value)} placeholder="Enter Additional Information" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter additional information.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Label>Manufacture Details:</Form.Label>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label> Model number</Form.Label>
                            <Form.Control required type="text" value={formf.modelNumber} onChange={(e) => setField('modelNumber', e.target.value)} placeholder="Enter Model Number" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter the model number.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label> Model Name</Form.Label>
                            <Form.Control required type="text" value={formf.modelName} onChange={(e) => setField('modelName', e.target.value)} placeholder="Enter Model Name" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter the model name.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label> Release Date</Form.Label>
                            <Form.Control required type="date" value={formf.releaseDate} onChange={(e) => setField('releaseDate', e.target.value)} placeholder="Enter Release date" />
                            <Form.Control.Feedback type="invalid">
                                Choose the release date.
            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    {
                        isEdit &&
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Check checked={formf.isActive === true}
                                    type="radio"
                                    label="Active"
                                    name="formHorizontalRadios"
                                    onClick={() => setField('isActive', true)}
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check checked={formf.isActive === false}
                                    type="radio"
                                    label="InActive"
                                    onClick={() => setField('isActive', false)}
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />
                            </Form.Group>
                        </Form.Row>
                    }

                    {storeError && <p style={{ color: 'red' }}>Cannot {isEdit ? 'Update' : 'Save'} the data </p>}
                    <Button type='submit'>{isEdit ? 'Update' : 'Save'}</Button>


                    <Button style={{ margin: '10px' }} onClick={() => {
                        props.history.push('/product')
                    }}>
                        Close
                    </Button>
                </Form>
                
            }
            <Snackbar open={snackBarOpen} message={isEdit?"Successfully Updated":"Successfully Added"} 
             autoHideDuration={3500} onClose={handleCloseSnack}>
        
        </Snackbar>
        

        </div>
    )
}
export default ProductForm
