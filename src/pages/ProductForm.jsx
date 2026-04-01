import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function ProductForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    const BASE_URL = 'https://api.escuelajs.co/api/v1/';
    event.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const selectedCategory = Number(categoryId);
    const numericPrice = Number(price);

    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !selectedCategory ||
      Number.isNaN(numericPrice) ||
      numericPrice <= 0
    ) {
      setError({
        message:
          'Please fill in all fields and choose a valid category and price.',
      });
      return;
    }

    const body = {
      title: trimmedTitle,
      price: numericPrice,
      description: trimmedDescription,
      categoryId: selectedCategory,
      images: ['https://placeimg.com/640/480/any'],
    };

    try {
      const response = await axios.post(BASE_URL + 'products/', body);
      console.log(response.data);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError({
        status: err.response?.status,
        message: err.response?.data?.message || err.message,
      });
    }
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
            <label htmlFor='categoryId'>Category: </label>
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
