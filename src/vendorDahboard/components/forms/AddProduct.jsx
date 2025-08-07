import React, { useState } from 'react'
import { API_URL } from '../../Data/ApiPath';


const AddProduct = () => {
 
  const[productName,SetProductName]=useState("");
   const [price,SetPrice]=useState("");
  const [category,SetCategory]=useState([]);
  const [bestSeller,SetBestSeller]=useState(false);
  const [image,SetImage]=useState(null);
  const [description,SetDescription]=useState("");


   const handleCategoryChange=(event)=>{
  const value=event.target.value;
   if(category.includes(value)){
    SetCategory(category.filter((item)=> item!== value))
   }
   else{
    SetCategory([...category,value])
   }}

   const handleBestSeller=()=>{
    const value=event.target.value=== "true";
     SetBestSeller(value) }

     const handleImageUpload=(event)=>{
  const selectedImage=event.target.files[0];
  SetImage(selectedImage)
 }

const handleSubmit = async(e)=>{
  e.preventDefault()
  try{
    const loginToken=localStorage.getItem("loginToken");
    const firmId=localStorage.getItem("firmId")
   if(! loginToken|| !firmId){
    console.error("user not authenticated")
   }
 const formData=new FormData();
    formData.append("productName",productName);
    formData.append("price",price);
    formData.append("description",description);
    formData.append("image",image);

    category.forEach((value)=>{
       formData.append("category",value);
    })
    const reponse = await fetch(`${API_URL}/add-product/${firmId}`,{
      method:"POST",
      body:formData
    })
  const data = await reponse.json()
  if (reponse.ok){
    console.log(data);
    alert("Product Added Successfully")
  
  SetProductName("");
    SetPrice("");
      SetCategory([]);
        SetBestSeller(false);
          SetImage(null);
            SetDescription("");
      }    
  }
 catch(error) {
    console.error("Prodcut Added Failed",error)
   
  }
}
  return (
    <div className="firmSection">
        <form  className="labelForm "onSubmit={handleSubmit}>
            <h3>Add Product</h3>
            <label>Product Name</label>
            <input type='text' value={productName} onChange={(e)=>SetProductName(e.target.value)} />
            <label>Price</label>
            <input type='text'value={price} onChange={(e)=>SetPrice(e.target.value)}/>
             <div className="checkInp">
                <label >Category</label>
               <div className="inputsContainer">
               <div className="checboxContainer">
                     <label>Veg</label>
                     <input type="checkbox" checked={category.includes('veg')}value="veg" onChange={handleCategoryChange}/>
                  </div>
                  <div className="checboxContainer">
                    <label>Non-Veg</label>
                    <input type="checkbox"checked={category.includes('non-veg')} value="non-veg"onChange={handleCategoryChange} />
                  </div>
   </div>
   </div>
           
            <div className="checkInp">
                <label >BestSellers</label>
               <div className="inputsContainer">
               <div className="checboxContainer">
                     <label>Yes</label>
                     <input type="radio" checked={bestSeller===true}value="true" onChange={handleBestSeller}/>
                  </div>
                  <div className="checboxContainer">
                    <label>No</label>
                    <input type="radio"checked={bestSeller===false} value="false" onChange={handleBestSeller}/>
                  </div>
   </div>
   </div>
            <label>Description</label>
            <input type='text'value={description} onChange={(e)=>SetDescription(e.target.value)}/>
            <label>Firm Image</label>
            
            <input type='file' onChange={handleImageUpload}/>
         <div className='btnSubmit'>
              <button type='Submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct