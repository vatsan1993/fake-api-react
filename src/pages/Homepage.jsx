import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Homepage() {
  const BASE_URL = 'https://api.escuelajs.co/api/v1/';

  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get(BASE_URL + 'products/')
        .then((response) => {
          // console.log(response.data);
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    };
    fetchProducts();

    return () => {};
  }, []);

  return (
    <>
      <header>
        <h1>Fake Store API</h1>
      </header>
      <main>
        {isLoading ? <p>Loading products</p> : null}
        {error ? <p>Errors: {error.message}</p> : null}
        {products &&
          products.map((product) => {
            console.log(product);

            return (
              <div key={product.id}>
                <h2>
                  {product.id + ' '}
                  {product.title}
                </h2>
                <p>{product.description}</p>
                <p>Category: {product.category.name}</p>
                <img src={product.images[0]} alt='' />
              </div>
            );
          })}
      </main>
      <footer></footer>
    </>
  );
}
