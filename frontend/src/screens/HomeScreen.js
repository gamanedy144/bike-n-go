import React, { useEffect, useReducer, useState } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import bg1 from '../images/home1.jpg';
import bg2 from '../images/home2.jpg';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

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
      {/* <div className="homescreen-bg-container">
        <img
          src={backgroundPhoto}
          alt="bycicle-store"
          className="homescreen-bg"
        />
      </div> */}
      <div className="carousel-container mb-3">
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={bg1} alt="First slide" />
            <Carousel.Caption>
              <div className="see-trough p-3">
                <h3 className="display-3">
                  <strong>Bike N Go</strong>
                </h3>
                <p>Now open in London!</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={bg2} alt="Second slide" />

            <Carousel.Caption>
              <div className="see-trough p-3">
                <h3 className="display-3">
                  <strong>Rent your bike!</strong>
                </h3>
                <p className="mb-3">
                  Visit us at one of our two locations now opened in central
                  London!
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
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
