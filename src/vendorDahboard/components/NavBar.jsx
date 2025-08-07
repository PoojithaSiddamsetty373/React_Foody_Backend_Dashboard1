import React from 'react'

const NavBar = ({ShowLoginHandler,ShowRegisterHandler,showLogout,logOutHandler})=>{
 const FirmName = localStorage.getItem("firmName")
  return (
    <div className='navSection'>
        <div className='company'>
             Vendor Dashboard
        </div>
        <div className="firmName">
          <h4>Firmname : {FirmName}</h4>
        </div>
        <div className='userAuth'>
          {!showLogout ?   <>
           <span onClick={ShowLoginHandler}>Login/</span>
       <span onClick={ShowRegisterHandler}>Register</span>
          </>:  <span onClick={logOutHandler}>Logout</span>}
       
      
    </div>
    </div>
  )
}

export default NavBar