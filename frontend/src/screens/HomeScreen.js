import React from 'react';
import data from '../data';
import { Link } from 'react-router-dom';
import backgroundPhoto from '../images/home2.jpg';
export default function HomeScreen() {
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
        {data.products.map((product) => (
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
