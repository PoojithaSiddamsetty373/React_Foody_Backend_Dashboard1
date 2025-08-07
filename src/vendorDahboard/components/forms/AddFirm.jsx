import React, { useState } from 'react'
import { API_URL } from '../../Data/ApiPath';

const AddFirm = () => {
   const[firmName,SetFirmName]=useState("");
   const [area,SetArea]=useState("");
  const [category,SetCategory]=useState([]);
  const [region,SetRegion]=useState([]);
  const [offer,SetOffer]=useState("");
  const [file,SetFile]=useState(null);

  const handleCategoryChange=(event)=>{
  const value=event.target.value;
   if(category.includes(value)){
    SetCategory(category.filter((item)=> item!== value))
   }
   else{
    SetCategory([...category,value])
   }}

  const handleRegionChange=(event)=>{
  const value=event.target.value;
   if(region.includes(value)){
    SetRegion(region.filter((item)=> item!== value))
   }
   else{
    SetRegion([...region,value])
   } }

 const handleImageUpload=(event)=>{
  const selectedImage=event.target.files[0];
  SetFile(selectedImage)
 }
const handleSubmit= async (e)=>{
e.preventDefault();
  try{
    const loginToken=localStorage.getItem("loginToken");
    if (!loginToken){
      console.error("User not Autenticated");
    }
    const formData=new FormData();
    formData.append("firmName",firmName);
    formData.append("area",area);
    formData.append("offer",offer);
    formData.append("image",file);

    category.forEach((value)=>{
       formData.append("category",value);
    })
     region.forEach((value)=>{
       formData.append("region",value);
    })

    const response = await fetch(`${API_URL}/firm/add-firm`,{
      method:'POST',
      headers:{
        "token":`${loginToken}`
      },
      body:formData
    });
    const data= await response.json()
    if (response.ok){
      console.log(data);
   
    SetFirmName("");
    SetArea("");
    SetCategory([]);
    SetRegion([]);
    SetOffer("");
    SetFile(null);
    alert("Firm Added Sucessfully")
}
else if(data.message === "Vendor can have only one firm"){
  alert(" Firm Exists .Only 1 firm can be added ")
}else{
  alert("Failed to add firm")
}
console.log("this is  firmId",data.firmId);
const firmId = data.firmId;
localStorage.setItem("firmId",firmId)

 } catch(error) {
    console.error("Firm Added Failed",error)
   
  }
}

  return (
    <div className="firmSection">
        <form  className="labelForm" onSubmit={handleSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type='text' name='firmname' value={firmName} onChange={(e)=>SetFirmName(e.target.value)}/>
            <label>Area</label>
            <input type='text' name='area'value={area}onChange={(e)=>SetArea(e.target.value)}/>
         <div className="checkInp">
                <label >Category</label>
               <div className="inputsContainer">
               <div className="checboxContainer">
                     <label>Veg</label>
                     <input type="checkbox" checked={category.includes('veg')} value="veg"onChange={handleCategoryChange}/>
                  </div>
                  <div className="checboxContainer">
                    <label>Non-Veg</label>
                    <input type="checkbox"checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
                  </div>
   </div>
   </div>
             <label>Offer</label>
            <input type='text'name='offer'value={offer}onChange={(e)=>SetOffer(e.target.value)}/>
            <div className="checkInp">
                <label >Region</label>
               <div className="inputsContainer">
               <div className="regboxContainer">
                     <label>South Indian</label>
                     <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}/>
                  </div>
                  <div className="regboxContainer">
                    <label>North-Indian</label>
                    <input type="checkbox"  value="north-indian"checked={region.includes('north-indian')} onChange={handleRegionChange} />
                  </div>
                   <div className="regboxContainer">
                     <label>Chineese</label>
                     <input type="checkbox" value="chineese"checked={region.includes('chineese')} onChange={handleRegionChange}/>
                  </div>
                  <div className="regboxContainer">
                    <label>Bakery</label>
                    <input type="checkbox" value="Bakery"checked={region.includes('Bakery')} onChange={handleRegionChange} />
                  </div>
                </div>
               </div>

          
          {/* <label>Region</label>
            <input type='text'/>*/}
           
            <label>Firm Image</label>
            <input type='file' onChange={handleImageUpload}/>
         <div className='btnSubmit'>
              <button type='Submit'>Submit</button>
            </div>
        </form>
    </div>
  )

}
export default AddFirm