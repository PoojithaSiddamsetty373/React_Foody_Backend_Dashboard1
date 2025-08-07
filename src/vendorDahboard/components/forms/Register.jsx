import React ,{useState} from 'react'
import {API_URL} from "../../Data/ApiPath";
const Register = ({ShowLoginHandler}) => {
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    const response = await fetch(`${API_URL}/vendor/register`, {
     method: 'POST',
     headers:{
      'Content-Type':'application/json'},
     body:JSON.stringify({username,email,password})
  })
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          alert("Vendor registered successfully");
         ShowLoginHandler()
        } else {
            alert("Server connected but registration failed");
            console.warn("Registration failed response:", data);
        }

    } catch (error) {
        // 👉 Server unreachable (like network issue or CORS)
        console.error("❌ Server not reachable or error occurred:", error);
        alert("❌ Server not reachable");
    }}
  return (
    <div className="registerSection">
        <form className='authForm'onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
            <label>Username</label>
            <input type='text' name="username"value={username} onChange={(e)=> setUsername(e.target.value)}placeholder='Enter your Name'/><br/>
              <label>Email</label>
               <input type='text'name="email"value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your Email'/><br/>  
              <label>Password</label>
            <input type='password'name="password"value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your password'/><br/>
            <div className='btnSubmit'>
              <button type='Submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register