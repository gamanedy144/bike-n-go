import React, { useEffect, useReducer, useState } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import backgroundPhoto from '../images/home2.jpg';
import axios from 'axios';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function HomeScreen() {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {/* <h1>Featured Products</h1> */}
      <div className="homescreen-bg-container">
        <img
          src={backgroundPhoto}
          alt="bycicle-store"
          className="homescreen-bg"
        />
      </div>

      <div className="products">
        {products.map((product) => (
          <div key={product._id} className="product">
            <Link to={`/product/${product.slug}`}>
              <img
                className="med-photo"
                src={product.image}
                alt={product.name}
              />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>{product.price}</strong>
              </p>
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
