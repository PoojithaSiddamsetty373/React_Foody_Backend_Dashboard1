import { useEffect, useState } from "react"
import {API_URL} from "../Data/ApiPath";
const AllProducts =  () => {
    const [products,setProducts]= useState([]);

    const handleSubmit= async()=>{
       const firmId = localStorage.getItem("firmId");
         console.log('firmId:', firmId);
    console.log('API_URL:', API_URL);

    if (!firmId) {
      alert("No firmId found in localStorage. Please login or set it first.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/add-product/${firmId}/products`)
      console.log('Fetching from:', response);

      

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const newProductData = await response.json();
     setProducts(newProductData.products || []);

      console.log('Fetched products:', newProductData);
      alert("All Products Displayed Here...")
    } catch (error) {
       
         console.error('failed to fetch',error)
        alert("failed to fetch problems")
    }
}
useEffect(()=>{
  handleSubmit()
  console.log('this is useEffect')
},[])
 const deleteProductById=async(productId)=>{
      try{
          const  response = await fetch(`${API_URL}/product/delete/${productId}`,{
            method:'DELETE',
            headers:{
                token:localStorage.getItem("loginToken")
            }
          })
          if (response.ok){
            setProducts(products.filter(product => product._id !== productId));
            confirm("Are u sure ,you want to delete?")
            alert("Product delete successfully")
            
          }  }
      catch(error){
       console.error("Failed to  Delete product")
       alert("Failed to delete",error)
      }}
      return (
  <div>
    {products.length > 0 ? (
      <table className="product_table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>
                {product.image && (
                 <img src={`${API_URL}/uploads/${product.image}`}

                    alt={product.productName}
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => deleteProductById(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No Products Added</p>
    )}
  </div>
);

  /*return (
    <div>
     {products.length > 0 ? 
 (
      <p>No Products Added</p>
     ):(
      <table className="product_table">
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product)=>{
                return(
                <>
                <tr key={product._Id}
>

                   <td>{product.productName}</td>
                     <td>{product.price}</td>
                       <td>{product.image && (
                          <img src={`${API_URL}/uploads/${product.image}`}
                          alt={product.productName}
                          style={{width:'50px',height:'50px'}}/>
                           )}
                       </td>
                       <td>
                           <button onClick={()=>deleteProductById(product._Id)}>Delete</button>
                       </td>
                </tr>
                </>
                )

            })}
        </tbody>
      </table>
     
     )}
    </div>*/
  
}

export default AllProducts
