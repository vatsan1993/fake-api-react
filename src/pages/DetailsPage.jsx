import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function DetailasPage() {
  const { productId } = useParams();
  console.log(`product id : ${productId}`);

  const [product, setProduct] = useState(null);
  const BASE_URL = 'https://api.escuelajs.co/api/v1/';
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setError(null);
      try {
        const response = await axios.get(BASE_URL + `products/${productId}`);
        console.log(response);
        setProduct(response.data);
      } catch (fetchError) {
        console.log(fetchError);
        setError({
          status: fetchError.response?.status,
          message: fetchError.response?.data?.message || fetchError.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <>
        <header>
          <h1>Fake Store API | Product</h1>
        </header>
        <p>Product Loading</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <header>
          <h1>Fake Store API | Product</h1>
        </header>
        <p>
          {error.status} {error.message}
        </p>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <header>
          <h1>Fake Store API | Product</h1>
        </header>
        <p>Product not found.</p>
      </>
    );
  }

  return (
    <>
      <header>
        <h1>Fake Store API | Product</h1>
      </header>
      <div>
        <h2>
          {product.id + ' '}
          {product.title}
        </h2>
        <p>{product.description}</p>
        <p>Category: {product.category.name}</p>
        <img src={product.images[0]} alt='' />
      </div>
    </>
  );
}
