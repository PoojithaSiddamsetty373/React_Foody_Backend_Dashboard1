import React from 'react'

const SideBar = ({ShowFirmHandler,
                 ShowProductHandler,
                 ShowAllproductsHandler,
                showFirmTitle})=>{

  return (
    <div className='sideBarSection'>
        <ul>
          {showFirmTitle ? <li onClick={ShowFirmHandler}> Add Firm</li> :"" }
         <li onClick={ShowProductHandler}> Add Products</li>
         <li onClick={ShowAllproductsHandler}> All Products</li>
         <li> User Details</li>



        </ul>

    </div>
  )
}

export default SideBar