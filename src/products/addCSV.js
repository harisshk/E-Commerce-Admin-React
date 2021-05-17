import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import {Modal} from 'react-bootstrap'
import CSVReader from 'react-csv-reader'
import {addCSVProduct} from '../services/productService'
import SpinLoader from '../components/spinLoader'

export const AddCSVModal =(props)=>{
    const{onHide,show}=props
    const [csvProduct,setCsvProduct]=useState([])
    const [loading,setLoading]=useState(true)
    const [dbError,setDbError]=useState(false)
    const convertCSV2JSON=(data)=>{
        const uploadArray=[]
       data.forEach(element => {
           if(element.length===20){
            
            const final = {
                name: element[0],
                brand: { brandName: element[1] },
                category:element[2],
                subCategory: element[3],
                shortDescription: element[4],
                description: element[5],
                tags:element[6],
                price: Number(element[7]),
                stock: Number (element[8]),
                gallery: element[9].split(","),
                warranty: element[14],
                replacementPolicy: element[15],
                additionalInformation: element[16],
                
                dimensions: {
                    height: element[10],
                    weight: element[11],
                    depth: element[12],
                    width: element[13]
                },
                manufactureDetails: {
                    modelNumber: element[17],
                    modelName: element[18],
                    releaseDate: element[19]
                }
            }
            console.log(final)
            uploadArray.push(final)
           }
           setCsvProduct(uploadArray)
       });
    }
    
    const uploadCSV=async()=>{
        setLoading(false)
        var error=0
        var iteration=0
        csvProduct.forEach(async(element)=>{
            const data = await addCSVProduct(element)
            console.log(data)
            iteration+=1
            if(data){
                error=error+1
                console.log(error)
            }
            if(iteration===csvProduct.length){
                if(error===csvProduct.length){
                setLoading(true)
                onHide()
                }
                else{
                    setLoading(true)
                    setDbError(true)
                }
            }
            
        })

        console.log("done")
        console.log(error)
        console.log(csvProduct.length)
       

       
            
    }
    const uploadcss={
        border:"1px dotted red",
        padding:"10px",
        margin:"10px",
        height:"100px",
        display:"flex",
        justifyContent:"center"
    }
    useEffect(()=>{
        setLoading(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

return(
   
            <div>
                    {loading?
                     <Modal  centered onHide={onHide}  show={show} on ><Modal.Header closeButton>
                    Add Product via CSV
                </Modal.Header>
                <Modal.Body style={{height:"300px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CSVReader onFileLoaded={(data) => convertCSV2JSON(data)}  inputStyle={uploadcss} />
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={()=>uploadCSV()}>Upload</Button>
                <Button onClick={()=>{onHide()}}>Close</Button>
                {dbError && <p style={{color:"red"}}>Error in uploading. Check the CSV file format</p>}
                </Modal.Footer>
                 </Modal>
                :
                <Modal  centered onHide={onHide}  show={show} on ><Modal.Header closeButton>
                    Add Product via CSV
                </Modal.Header>
                <Modal.Body style={{height:"300px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <SpinLoader />
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={()=>uploadCSV()}>Upload</Button>
                <Button onClick={()=>{onHide()}}>Close</Button>
                </Modal.Footer>
                 </Modal>
                }
            </div>
           
)
} 
export default AddCSVModal