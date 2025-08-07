import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className="errorSection">
    <Link to="/" style={{fontSize:"1.5rem"}}>
    <p>Go Back</p>
    </Link>
     
        <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
    </>
   
  )
}

export default NotFound
