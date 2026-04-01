import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function ProductForm() {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    const BASE_URL = 'https://api.escuelajs.co/api/v1/';

    event.preventDefault();
    console.log('title: ' + title);
    console.log('description: ' + description);
    console.log('categoryId: ' + categoryId);
    console.log('price: ' + price);

    let body = {
      title: title,
      price: price,
      description: description,
      categoryId: categoryId,
      images: [],
    };

    await axios
      .post(BASE_URL + '/products', body)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <>
      <header>
        <h1>Fake Store API</h1>
      </header>
      <main>
        <h2>Add Product</h2>
        <form onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor='title'>Title: </label>
            <input
              type='text'
              name='title'
              id='title'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor='description'>Description:</label>
            <textarea
              name='description'
              id='description'
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor='category'
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            >
              Category:{' '}
            </label>
            <select
              name='categoryId'
              id='categoryId'
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            >
              <option value={null}>Select A Category</option>
              <option value='1'>Clothing</option>
              <option value='2'>Electronics</option>
              <option value='3'>Kitchen Ware</option>
              <option value='4'>Furniture</option>
            </select>
          </div>
          <div>
            <label htmlFor='price'>Price: </label>
            <input
              type='number'
              name='price'
              id='price'
              onChange={(e) => {
                setPrice(parseInt(e.target.value));
              }}
            />
          </div>
          <div>
            <input type='submit' name='submit' id='submit' />
          </div>
        </form>

        {error ? (
          <p>
            {error.status} {error.message}
          </p>
        ) : null}
      </main>
      <footer></footer>
    </>
  );
}
