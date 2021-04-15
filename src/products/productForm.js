import React, { useState, useEffect } from 'react'
import { Form, Col, Button ,Spinner} from 'react-bootstrap';
import { getAllCategories, getAllTags, addProduct, editProduct } from './../services/productService'
import { VariantForm } from './variantForm'
import MaterialTable from 'material-table'


export const ProductForm = (props) => {
    const styles = {
        margin: "20px 50px"
    }
    const columns = [{ title: "Color", field: 'color' },
    { title: "Size", field: 'size' },
    { title: "Price", field: 'price' },
    { title: "Stock", field: 'stock' },
    ]
    const [editImage, setEditImage] = useState([])
    const [editVariant, setEditVariant] = useState({})
    const [tag, setTag] = useState(null)
    const [isVariantEdit, setIsVariantEdit] = useState(false)
    const [modalShow, setModalShow] = React.useState(false);
    const [category, setCategory] = useState(null)
    const [variant, setVariant] = useState([])
    const [variantId, setVariantId] = useState([])
    const [formf, setForm] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    // const {edit} = props.location.state
    const getValues = async () => {
        if (!props.location.state) {

            setIsEdit(false)
        }
        else {
            setForm(props.location.state)
            setVariant(props.location.state.variants)

            setVariantId(props.location.state.variantId)
            setIsEdit(true)

        }
        try {
            const category = await getAllCategories()
            setCategory(category)
            const tag = await getAllTags()
            setTag(tag)

        }
        catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        getValues()
        setVariantRequired(false)
        setValidated(false)
        setStoreError(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const dataChooser = () => {

        return variant
    }
    const setField = (field, value) => {
        setForm({
            ...formf,
            [field]: value
        })
    }
    const ss = (data) => {
        console.log('===', data)
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

    const [validated, setValidated] = useState(false);
    const [storeError,setStoreError] = useState(false);
    const [variantRequired, setVariantRequired] = useState(false)
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (variantId.length !== 0 && form.checkValidity() === true) {

            event.preventDefault();
            setVariantRequired(false)
            if (isEdit) {
                console.log('update')
                const data = await editProduct(formf, props.location.state.id, variantId)
                if (data) {
                    props.history.push('/product/')
                }
                else{
                    setStoreError(true)
                }
            }
            else {
                const data = await addProduct(formf, variantId)
                if (data) {
                    props.history.push('/product')
                }
                else{
                    setStoreError(true)
                }
            }
      }
        else if (variantId.length !== 0) {
            setVariantRequired(false)
            event.preventDefault();
        }
        else {
            event.preventDefault();
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
            {!category && !tag && 
            <div style={{width:'100%',height:'100px',marginTop:'300px'}} >
            <Spinner style={{display:'block',marginLeft:'auto',height:'50px',width:'50px',
          marginRight:'auto'}} animation="border" variant="primary" />
          <p style={{display:'block',marginLeft:'auto',
          marginRight:'auto',textAlign:'center'}}>Loading</p>
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
                            <Form.Label>Tags</Form.Label>
                            <Form.Control required as="select" value={formf.tags} onChange={(e) => setField('tags', e.target.value)} >
                                <option value=''>Select a Tag</option>
                                {tag.map((team) => <option key={team._id} value={team._id}>{team.tag}</option>)}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please choose tag.
            </Form.Control.Feedback>
                        </Form.Group>
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

                        <Form.Group as={Col} style={{ paddingLeft: '10px', alignItems: 'center' }}>
                            <Form.Label>Variants:</Form.Label>
                            <div style={{ margin: '50px 0px 0px 100px' }}>

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

                        </Form.Group>
                        <Form.Group as={Col}>
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
                                                console.log('Roe', rowData)
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
                            <Form.Control required type="text" value={formf.modelName} onChange={(e) => setField('modelName', e.target.value)} placeholder="Enter Model Number" />
                            <Form.Control.Feedback type="invalid">
                                Please Enter the model number.
            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label> Model Name</Form.Label>
                            <Form.Control required type="text" value={formf.modelNumber} onChange={(e) => setField('modelNumber', e.target.value)} placeholder="Enter Model Name" />
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

                    {storeError && <p style={{color:'red'}}>Cannot {isEdit ? 'Update' : 'Save'} the data </p>}
                    <Button type='submit'>{isEdit ? 'Update' : 'Save'}</Button>


                    <Button style={{ margin: '10px' }} onClick={() => {
                        props.history.push('/product')
                    }}>
                        Close
                    </Button>
                </Form>
            }
        </div>
    )
}
export default ProductForm
