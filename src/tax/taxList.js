import React, { useState, useEffect } from 'react'
import NavBar from './../components/navBar'
import Table from './../components/table'
import { Button } from 'react-bootstrap'
import { getAllTax ,deleteTax} from './../services/taxService'
import TaxModal from './taxModal'
import Reload from './../components/reload'
import SpinLoader from './../components/spinLoader'
export const TaxList = () => {
    const [modalShow, setModalShow] = useState(false)
    const [dbError,setDbError]=useState(false)
    const [tax, setTax] = useState(null)
    const [isEdit,setIsEdit]= useState({
        isEdit:false,
        data:{},
        id:""
    })
    const columns = [
        { title: "Country", field: "country" },
        { title: "Country Code", field: "countryCode" },
        { title: "State", field: "state" },
        { title: "State code", field: "stateCode" },
        { title: "Tax Percentage", field: "tax" }, {
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
    const actions = [
        {
            icon: 'edit',
            tooltip: 'Edit Tag',
            onClick: async (event, rowData) => {
               setIsEdit({
                   ...isEdit,
                   data:rowData,
                   isEdit:true,
                   id:rowData._id
               })
               setModalShow(true)
            }
        }
    ]
    const options = {
        actionsColumnIndex: -1,
        showFirstLastPageButtons: false,
        emptyRowsWhenPaging: false,

    }
    const editable = {
        onRowDelete: selectedRow => new Promise(async (resolve, reject) => {
            const id = selectedRow._id
            const data = await deleteTax(id)
            if(!data.error){
                getTax()
                resolve()
            }
            
        }),
    }
    const getTax = async () => {
        const data = await getAllTax()
        if (!data.error) {
            setTax(data.data)
        }
        else {
            setDbError(true)
        }
    }
    const open = () => {
        setModalShow(true)
    }
    const close = () => {
        setIsEdit({isEdit:false,data:{}})
        setModalShow(false)
        getTax()
    }
    useEffect(() => {
        getTax()
        // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [])
    return (
        <div>
            <NavBar></NavBar>
            {tax ?
                <div style={{ margin: '30px' }}>
                    <Button onClick={() => { open() }}>Add Tax</Button>
                    <Table title="Tax" style={{ margin: '5px 50px' }} data={tax} actions={actions} options={options} editable={editable} columns={columns} />
                    <TaxModal isEdit={isEdit} show={modalShow} edit onHide={()=>close()} />
                </div>
                :dbError?
            <Reload href={"/tax"} />
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
export default TaxList