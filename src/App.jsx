import React  from 'react';
import './App.css';
import ProductList from './components/ProductPage/ProductList';
import CartPage from './components/CartPage'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"

 function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route exact path="/" element={<ProductList/>}></Route>
           <Route exact path="/ProductList/:id" element={<ProductList/>}></Route>
           <Route exact path="/Cart" element={<CartPage/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}
export default App;
