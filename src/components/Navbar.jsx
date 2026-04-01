import React from 'react';
import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/add-product'>Add Product</Link>
    </nav>
  );
}
