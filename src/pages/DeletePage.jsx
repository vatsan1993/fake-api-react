import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

export default function DeletePage() {
  const data = useParams();
  console.log(data);

  const { productId } = useParams();

  console.log(`product id ${productId}`);

  const navigate = useNavigate();
  const [error, setError] = useState();
  const BASE_URL = 'https://api.escuelajs.co/api/v1/';
  const deleteProduct = async (productId) => {
    setError(null);
    axios
      .delete(BASE_URL + `products/${productId}`)
      .then((response) => {
        navigate('/');
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <div>
      <p>{`Do you want to delete the product with the id: ${productId} ?`}</p>
      <input
        type='button'
        name='delete'
        id='delete'
        value='delete'
        onClick={(e) => {
          deleteProduct(productId);
        }}
      />
      {error ? (
        <p>
          {error.status} {error.message}
        </p>
      ) : null}
    </div>
  );
}
