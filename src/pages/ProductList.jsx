// pages/ProductList.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../features/productSlice';

function ProductList() {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const handleAddProduct = () => {
    const productId = products.length + 1;  // กำหนด ID ใหม่
    const productToAdd = {
      id: productId,
      name: newProduct.name,
      price: parseInt(newProduct.price),
      description: newProduct.description
    };
    dispatch(addProduct(productToAdd));
    setNewProduct({ name: '', price: '', description: '' });  // ล้างฟอร์ม
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleRemove(product.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Add New Product</h3>
      <div>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={newProduct.name} 
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Product Price" 
          value={newProduct.price} 
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Product Description" 
          value={newProduct.description} 
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default ProductList;
