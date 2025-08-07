import React ,{ useState }from 'react' ;
import {API_URL} from "../../Data/ApiPath";

const Login = ({ShowWelcomeHandler}) => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    const response =await fetch(`${API_URL}/vendor/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
  body:JSON.stringify({email,password})
      });
   const data=await response.json();
   if (response.ok){
     alert("Login Sucess")
     setEmail("");
     setPassword("");
    
     localStorage.setItem("loginToken",data.token);
     
    ShowWelcomeHandler();
   }
  
   const vendorId = data.vendorId
   console.log("checking for VendorId:",vendorId)
   const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
   const vendorData = await vendorResponse.json();
   if (vendorResponse.ok){
    const vendorFirmId = vendorData.vendorFirmId;
    const vendorFirmName = vendorData.vendor.firm[0].firmName;
  
    localStorage.setItem("firmId",vendorFirmId)
    localStorage.setItem("firmName",vendorFirmName)
    window.location.reload()
   }
  }

  catch(error){
    console.error("Login Failed",error)
    alert("Login Failed")
    
  }
}

  return (
    <div className='loginSection'>
        
        <form className='authForm'onSubmit={handleSubmit}>
            <h3>Vendor Login</h3>
            <label>Email</label>
            <input type='text' name="email" value={email}  onChange={(e)=>setEmail(e.target.value)}placeholder='enter your Email'/><br/>
              <label>Password</label>
            <input type='password' name="password" value={password}  onChange={(e)=>setPassword(e.target.value)}placeholder='enter your password'/><br/>
            <div className='btnSubmit'>
              <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login