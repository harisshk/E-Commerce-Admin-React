import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import {Modal} from 'react-bootstrap'
import CSVReader from 'react-csv-reader'
import {addCSVProduct} from '../services/productService'
import SpinLoader from '../components/spinLoader'
import Table from '../components/table'
import DownloadLink from "react-download-link";

export const AddCSVModal =(props)=>{
    const{onHide,show}=props
    const [csvProduct,setCsvProduct]=useState([])
    const [uploadetails,setUploadDetails]=useState([])
    const [loading,setLoading]=useState(true)
    const [loaded,setLoaded]=useState(true)
    const [fileLoaded,setFileLoaded]=useState(false)
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
            uploadArray.push(final)
           }
           setCsvProduct(uploadArray)
       });
    }
    
    const uploadCSV=async()=>{
        setLoading(false)
        var iteration=0
        const arr=[]
        csvProduct.forEach(async(element)=>{
            const data = await addCSVProduct(element)
            arr.push(data)
            iteration+=1
            if(iteration===csvProduct.length)
            {
                setUploadDetails(arr)
                setLoaded(true)
            }
        })

    }
    const columns=[
        {title:"Product name",field:"data"},
        {title:"Status",field:"message"},
    ]
    const uploadcss={
        border:"1px dotted red",
        padding:"10px",
        margin:"10px",
        height:"50px",
        display:"flex",
        justifyContent:"center"
    }
    

    useEffect(()=>{
        setLoading(true)
        setFileLoaded(false)
        setLoaded(false)
        setUploadDetails([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

return(
   
            <div>
                    {loading?
                     <Modal  centered onHide={onHide}  show={show} on ><Modal.Header closeButton>
                    Add Product via CSV
                </Modal.Header>
                <Modal.Body style={{height:"300px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CSVReader onFileLoaded={(data) => {
                    convertCSV2JSON(data)
                    setFileLoaded(true)
                    }}  inputStyle={uploadcss} />
                </Modal.Body>
                <Modal.Footer> <Button> <DownloadLink  
             style={{color:"white"}}
    label="Download Template" 
    filename="template.csv"
    exportFile={() =>"Double Convertible Sofa Bed,Organizeme,6080fc820689e0205c8df850,60816abb214c9ed619edd913,Modern Furniture Design Functional Furniture: Works as a Bed Chair and Lounger Water Proof Fabric: Great for Indoor and Outdoor Use Decorative Pillows,Pillows,608151ea2cbc47aa6ffcf27b,699,35,\"https://i1.wp.com/www.organizemeusa.com/wp-content/uploads/2019/02/Shoe-Rack-Amazon-Images-1-BLACK.jpg?fit=1000%2C1000&ssl=1,https://i1.wp.com/www.organizemeusa.com/wp-content/uploads/2019/02/Shoe-Rack-Amazon-Images-1-BLACK.jpg?fit=1000%2C1000&ssl=1\",10,10,2.5,400g,6 months warranty,20 days replacement,no info,Shoe Storage-DT,Shoe Storage-DT,2021-04-16"}
/></Button>
                <Button disabled={!fileLoaded} onClick={()=>uploadCSV()}>Upload</Button>
                <Button onClick={()=>{onHide()}} >Close</Button>
            
                {/* <CSVDownloader
        data={temp}
        type="button"
        filename={'products'}
        bom={true}
        style={{width:"100px",padding:"10px",
    height:"45px",backgroundColor:"#067BFD",color:"white",border:"none",borderRadius:"4px"}}
      >
        Download
      </CSVDownloade
      r> */}
                </Modal.Footer>
                 </Modal>
                :
                <Modal  centered onHide={onHide}  show={show} on ><Modal.Header closeButton>
                    Add Product via CSV
                </Modal.Header>
                <Modal.Body >
             {loaded?  <Table columns={columns} data={uploadetails}
              options={{
                                    search: false,
                                    toolbar: false,
                                    paging: false,
                                    actionsColumnIndex: -1,
                                    emptyRowsWhenPaging: false,
                                }} />
             :<SpinLoader />}
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={()=>{onHide()}}>Close</Button>
              
                </Modal.Footer>
                 </Modal>
                }
            </div>
           
)
} 
export default AddCSVModal