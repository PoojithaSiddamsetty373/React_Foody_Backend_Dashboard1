import React,{useState,useEffect}from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
 import Welcome  from '../components/forms/Welcome'
 import AllProducts from '../components/AllProducts'

const LandingPage=()=>{
  const [showLogin,setShowLogin]=useState(false)
  const [showRegister,setShowRegister]=useState(false)
  const [showFirm,setShowFirm]=useState(false)
  const [showProduct,setShowProduct]=useState(false)
   const [showWelcome,setShowWelcome]=useState(false)
   const [showAllproducts,setShowAllproducts]=useState(false)
  const [showLogout,setShowLogout]=useState(false)
   const [showFirmTitle,setShowFirmTitle]=useState(true)
   
  useEffect(()=>{
    const loginToken = localStorage.getItem("loginToken");
    if(loginToken){
      setShowLogout(true)
    }
  },[])
   
  useEffect(()=>{
    const firmName = localStorage.getItem("firmName");
    if(firmName){
      setShowFirmTitle(false)
    }
  },[])

  const logOutHandler=()=>{
    confirm("Are u sure to Logout??")
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmName");
    localStorage.removeItem("firmId");
    setShowLogout(false)
    setShowFirmTitle(true)
  }

  const ShowLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
     setShowProduct(false)
     setShowWelcome(false)
      setShowAllproducts(false)
  }

  const ShowRegisterHandler =() => {
    setShowRegister(true)
    setShowLogin(false)
     setShowFirm(false)
     setShowProduct(false)
     setShowWelcome(false)
     setShowAllproducts(false)
  }

   const ShowFirmHandler = () =>{
    if(showLogout){
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(true)
    setShowProduct(false)
    setShowWelcome(false)
      setShowAllproducts(false)
  
  }
else{
  alert("Please Login")
  setShowLogin(true)
}}

   const ShowProductHandler = () =>{
    if(showLogout){
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(true)
   setShowWelcome(false)
      setShowAllproducts(false)
  }else{
    alert("Please Login")
    setShowLogin(true)
  }
  }
 const ShowWelcomeHandler = () =>{
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(true)
      setShowAllproducts(false)
   
  }
 const ShowAllproductsHandler = () =>{
  if(showLogout){
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllproducts(true)
   }
   else{
    alert("Please Login")
    setShowLogin(true)
   }
  }

  return (
    <>
    <section className='landingSection'>
    <NavBar ShowLoginHandler = {ShowLoginHandler} ShowRegisterHandler={ShowRegisterHandler} 
    showLogout={showLogout}
    logOutHandler={logOutHandler}/>
    
    <div className='collectionSection'>
<SideBar ShowFirmHandler={ShowFirmHandler} ShowProductHandler={ShowProductHandler}
    ShowAllproductsHandler={ShowAllproductsHandler}showFirmTitle={showFirmTitle}
     />
     {showLogin &&  <Login ShowWelcomeHandler={ShowWelcomeHandler}/>}
     {showRegister&& <Register ShowLoginHandler={ShowLoginHandler}/>}
     {showFirm&& showLogout && <AddFirm/>}
     {showProduct && showLogout && <AddProduct/>}
     {showWelcome && <Welcome/>}
      {showAllproducts && showLogout &&<AllProducts/>}
   {/*
    
   <Register/>
   
    <AddProduct/>
     <AddFirm/>*/
    }
   
    
     </div>
    </section>
    
    
    
    </>
  )
}

export default LandingPage