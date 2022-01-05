import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { allProducts } from '../products'

function CartPage() {
    
    let cartItems=localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    let amountPerProduct=JSON.parse(localStorage.getItem('amountPerProduct'))
   
    //added the qtyb field for all item of cart 
   cartItems.forEach(element => {
    element.qty=(amountPerProduct.find((p)=>p.productId==element.id)).qty
   });

    let totalPrice=(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)

   

    const openmodal=()=>{
    //Remove cart and amountPerProduct from localStarage 
      localStorage.setItem('cart',JSON.stringify([]))
      localStorage.setItem('amountPerProduct' ,JSON.stringify(allProducts.map(P=>({productId:P.id,qty:0}))))

      alert('total price is :' +totalPrice)
      window.location.reload();
    }

   let link=<Link to="/"><h5>
                             <i class="fa fa-arrow-left" aria-hidden="true"></i>
                             &nbsp; Back to Products List
                        </h5>
                </Link>
    return (
        <div>
            <header>
                <h1>Cart Page</h1> 
            </header>
           
        <>
           { cartItems.length>0 ?                
            <>
            {link}
            <br />
            <table className="table">
                <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Total Price</th>
                </tr>
                
                    {cartItems.map((p)=>
                    <tr key={p.id}>
                       <td>{p.title}</td>
                        <td><img src={p.image} width="140" height="140" alt="" /></td>
                       <td>{p.price}</td>
                       <td>{p.qty}</td>        
                       <td>{(p.price * p.qty).toFixed(2)}</td>

                    </tr>
                    )}
                 </table> 
                 <button type="button" className="btn btn-primary" onClick={openmodal}>Pay now</button>
                 </> :
                 <div>
                    <h5>your cart is empty </h5>  <br />
                    {link}
                 </div>
                 }
            </>
           
           
        </div>
    )
}


export default CartPage

