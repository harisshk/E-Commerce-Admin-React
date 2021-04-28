import React, { useEffect, useState } from 'react'
import { getAllTag, deleteTag } from './../services/tagService'
import { Button } from 'react-bootstrap'
import Snackbar from '@material-ui/core/Snackbar'
import TagModal from './tagModal'
import NavBar from '../components/navBar'
import Table from './../components/table'
import SpinLoader from '../components/spinLoader'
export const TagList = (props) => {
    const [tag, SetTag] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [editTag, setEditTag] = useState([])
    const [dbError, setDbError] = useState(false)
    const getTag = async () => {
        const data = await getAllTag()
        // console.log(data)
        if (data) {
            SetTag(data)
        }
        else {
            setDbError(true)
        }
    }
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const handleCloseSnack = () => {
        setSnackBarOpen(false)
    }
    const open = () => {
        setModalShow(true)
    }
    const modalClose = () => {
        getTag()
        setModalShow(false)
        setTimeout(() => {
            setIsEdit(false)
        }, 1500);
    }
    const onSave = () => {
        getTag()
        setModalShow(false)
        setTimeout(() => {
            setIsEdit(false)
        }, 1500);
    }
    const editActive = (data) => {
        setEditTag(data)
        setIsEdit(true)
        setModalShow(true)
    }
    const actions=[
        {
            icon: 'edit',
            tooltip: 'Edit Tag',
            onClick: async (event, rowData) => {
                editActive(rowData)
            }
        }
    ]
    const options ={
        actionsColumnIndex: -1,
        showFirstLastPageButtons: false,
        pageSize:10,
        pageSizeOptions: [10, 20, 50],
        emptyRowsWhenPaging:false,

    }
    const editable={
        onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
            const id = selectedRow._id
            const data = await deleteTag(id)
            if (data) {
                setSnackBarOpen(true)
                getTag()
                resolve()
            }
        }),
    }
    const columns = [
        { title: "Tag Name", field: 'tag' },
        {
            title: "Is Active", field: 'isActive',
            render: rowData => {
                if (rowData.isActive) {
                    return (
                        <p style={{ color: 'green', fontWeight: "bolder" }}>Active</p>
                    )
                }
                else {
                    return (
                        <p style={{ color: 'red', fontWeight: "bolder" }}>InActive</p>
                    )
                }
            }
        },
    ]
    useEffect(() => {
        getTag()
        setSnackBarOpen(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [])
    return (
        <div>
            <NavBar></NavBar>
            {tag ?
                <div style={{ margin: '30px' }}>
                    <Button onClick={() => { open() }}>Add Tag</Button>
                    <Table actions={actions} title="Tag" editable={editable}  style={{ margin:'5px 350px' }} columns={columns} data={tag}  options={options}/>
                    <TagModal
                        show={modalShow}
                        onHide={() => {
                            modalClose()
                        }}
                        editTag={editTag}
                        isEdit={isEdit}
                        onSave={onSave}
                    ></TagModal>
                    <Snackbar open={snackBarOpen} message="Successfully Deleted"
                        autoHideDuration={2000} onClose={handleCloseSnack}>
                    </Snackbar>
                </div>
                : dbError ?
                    <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >

                        <p style={{
                            display: 'block', marginLeft: 'auto',
                            marginRight: 'auto', textAlign: 'center'
                        }}>Looks like Server Down!!
   <br /><a href="/tags">
                                Try Reloading the page
</a></p>
                    </div>
                    :
                    <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >
                        <SpinLoader />
                        <p style={{
                            display: 'block', marginLeft: 'auto',
                            marginRight: 'auto', textAlign: 'center'
                        }}>Loading</p>
                    </div>
            }
        </div>
    )
}
export default TagList