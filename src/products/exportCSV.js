import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import {Modal} from 'react-bootstrap'
import { CSVDownloader } from 'react-papaparse'
export const ExportCSVModal =(props)=>{
    const{onHide,show,products}=props
    const [csvProduct,setCsvProduct]=useState([])
    const convertJSON2CSV=(data)=>{
        const uploadArray=[]
       if(data!==null){
        data.forEach(element => {
            const final = {
                name: element.name,
                brandName: element.brand.brandName,
                category: element.category._id,
                subCategory: element.subCategory._id,
                shortDescription: element.shortDescription,
                description: element.description,
                tags: element.tags,
                price: element.price,
                stock: element.stock,
                gallery: element.gallery,
                height: element.dimensions.height,
                weight: element.dimensions.weight,
                depth: element.dimensions.depth,
                width: element.dimensions.width,
                warranty: element.warranty,
                replacementPolicy: element.replacementPolicy,
                additionalInformation: element.additionalInformation,
                modelNumber: element.manufactureDetails.modelName,
                modelName: element.manufactureDetails.modelName,
                releaseDate: element.manufactureDetails.releaseDate,
            }
            uploadArray.push(final)
           
           setCsvProduct(uploadArray)
       });
       }
    }
    
    
    useEffect(()=>{
        convertJSON2CSV(products)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
   
return(
   
            <div>
                
                     <Modal  centered onHide={onHide}  show={show} on ><Modal.Header closeButton>
                    Export Product as CSV
                </Modal.Header>
                <Modal.Body style={{height:"100px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CSVDownloader
        data={csvProduct}
        type="button"
        filename={'products'}
        bom={true}
        style={{width:"100px",padding:"10px",
    height:"45px",backgroundColor:"#067BFD",color:"white",border:"none",borderRadius:"4px"}}
      >
        Download
      </CSVDownloader>
                </Modal.Body>
                <Modal.Footer>
               
                <Button onClick={()=>{onHide()}}>Close</Button>
               
                </Modal.Footer>
                 </Modal>
                
            </div>
           
)
} 
export default ExportCSVModal