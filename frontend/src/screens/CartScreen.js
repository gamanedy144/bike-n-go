import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import { Row, Col, ListGroup, Button, Card, Form } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, stores: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default function CartScreen() {
  const [{ loading, error, stores }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    stores: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/stores');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        console.log(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, paymentMethod, pickUpLocation },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Card'
  );
  const [pickUpLocationState, setPickUpLocation] = useState(
    pickUpLocation || stores.find((x) => x.slug === 'BNG-TB')
  );

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(pickUpLocation);
    ctxDispatch({
      type: 'SAVE_PICKUP_LOCATION',
      payload: pickUpLocationState,
    });
    localStorage.setItem('pickUpLocation', JSON.stringify(pickUpLocationState));
    ctxDispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: paymentMethodName,
    });
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/signin?redirect=/placeorder');
  };
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go shopping!</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fa-solid fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fa-solid fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={1}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Form onSubmit={submitHandler}>
            <Card className="mb-3">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h5>Choose a store:</h5>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="mb-3">
                      <Form.Check
                        type="radio"
                        id="BNG-TB"
                        label="Bike N Go Tower Bridge Store"
                        value="BNG-TB"
                        checked={
                          pickUpLocationState ===
                          stores.find((x) => x.slug === 'BNG-TB')
                        }
                        onChange={(e) =>
                          setPickUpLocation(
                            stores.find((x) => x.slug === e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <Form.Check
                        type="radio"
                        id="BNG-KC"
                        label="Bike N Go King's Cross Store"
                        value="BNG-KC"
                        checked={
                          pickUpLocationState ===
                          stores.find((x) => x.slug === 'BNG-KC')
                        }
                        onChange={(e) => {
                          setPickUpLocation(
                            stores.find((x) => x.slug === e.target.value)
                          );
                          console.log(
                            'THE STORE LOCATION',
                            stores.find((x) => x.slug === e.target.value)
                          );
                          console.log('pickUpLocation', pickUpLocation);
                          console.log(
                            'pickUpLocationState',
                            pickUpLocationState
                          );
                        }}
                      />
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h5>Choose a store:</h5>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="mb-3">
                      <Form.Check
                        type="radio"
                        id="Card"
                        label="Card"
                        value="Card"
                        checked={paymentMethodName === 'Card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </div>{' '}
                    <div className="mb-3">
                      <Form.Check
                        type="radio"
                        id="Cash"
                        label="Cash on pickup"
                        value="Cash"
                        checked={paymentMethodName === 'Cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h5>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items) : ${' '}
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{' '}
                      per day
                    </h5>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={cartItems.length === 0}
                        className="dark-bgc"
                      >
                        Continue
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
