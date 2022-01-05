import React from 'react'
import { Link } from 'react-router-dom';

const Pagination = ({ productsPerPage, totalProducts, paginate,currentPage }) => {


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i)
  }
  let nextBtn=totalProducts>(currentPage*productsPerPage)?true:false

  return (
    <nav>
      {
       pageNumbers.length>1 && currentPage>1 &&currentPage<pageNumbers.length  &&
        <>
          <Link onClick={() => paginate(currentPage-1)} to={`/ProductList/${currentPage-1}`} >
          &#8656; prev
          </Link>
          {nextBtn &&
          <Link onClick={() => paginate(currentPage+1)} to={`/ProductList/${currentPage+1}`} >
              next	&#8658;
          </Link>}
        </>
        }{
        currentPage>1 && currentPage===pageNumbers.length  &&
              
        <Link onClick={() => paginate(currentPage-1)} to={`/ProductList/${currentPage-1}`} >
        &#8656; prev 
        </Link> }
        { currentPage===1 && totalProducts>productsPerPage &&
        <>
         {nextBtn &&      
        <Link onClick={() => paginate(currentPage+1)} to={`/ProductList/${currentPage+1}`} >
              next &#8658;
        </Link>}  
      </>
      }
    </nav>
  );
};

export default Pagination
