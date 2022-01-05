import React, { useEffect,useState } from 'react'
import {allProducts} from '../../products'
import {Link} from "react-router-dom"
import './productList.css'
import Pagination from "./Pagination";

function ProductList() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [cartSize, setcartSize] = useState(0)
    const distinctCaegory=[...new Set(allProducts.map(p=>p.category))]
// Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = products? products.slice(indexOfFirstProduct, indexOfLastProduct):[];


  useEffect(() => {
    setProducts(allProducts)
    if(localStorage.getItem('cart'))
       setCart(JSON.parse(localStorage.getItem('cart')))
     else 
        localStorage.setItem('cart','[]')
        
    //on localStorage initial array of object {productId,qty} 
    if(!localStorage.getItem('amountPerProduct'))
        localStorage.setItem('amountPerProduct' ,JSON.stringify(allProducts.map(P=>({productId:P.id,qty:0}))))
    else
    setcartSize(JSON.parse(localStorage.getItem('amountPerProduct')).reduce((acc, item) => acc + item.qty, 0))
  }, []);

    const addToCart=(id)=>
    {
        let amountPerProduct=JSON.parse(localStorage.getItem('amountPerProduct'))
        let product=products.find((p)=>p.id==id)
        setCart([...cart,product])
        // check if product not already  exist in cart
        let cartTemp =JSON.parse(localStorage.getItem('cart'))
        if(!(cartTemp.some(p => p.id === id)))
        {
          localStorage.setItem('cart',JSON.stringify([...cart,product]))
        }
        amountPerProduct.forEach(p => {
            if(p.productId===id)
                p.qty=p.qty+1
    });
        localStorage.setItem('amountPerProduct' ,JSON.stringify(amountPerProduct))        
        setcartSize(amountPerProduct.reduce((acc, item) => acc + item.qty, 0))
    
    }

    const filterProductsByCategory=(category)=>
    {
      setProducts(allProducts.filter((p)=>p.category===category))
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div className='productPage'>
            <header className='d-flex '>
                <h1>Product List</h1>
                <Link to={{pathname:"/Cart"}} >
                    <i className="fa fa-shopping-cart" aria-hidden="true" ></i>
                    <p className="centered-cart-qty">{cartSize}</p>
                </Link>
            </header>

           <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
               Category
            </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {distinctCaegory.map((category)=> <li className="dropdown-item" onClick={()=>filterProductsByCategory(category)}>{category}</li>
                )}  
                </ul>
            </div>
            

            <table className="table">
                <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                    <th scope="col">Add to Cart</th>
                </tr>
                
                    {currentProducts.map((p)=>
                    <tr key={p.id}>
                       <td>{p.title}</td>
                       <td>{p.price}</td>
                       <td><img src={p.image} width="140" height="140" alt="" /></td>
                       <td><i className="fa fa-plus-circle" aria-hidden="true" onClick={()=>addToCart(p.id)}></i></td>

                    </tr>
                    )}
                 
            </table>
            <Pagination
               currentPage={currentPage}
               productsPerPage={productsPerPage}
               totalProducts={products.length}
               paginate={paginate}
             />
        </div>
    )
}

export default ProductList
