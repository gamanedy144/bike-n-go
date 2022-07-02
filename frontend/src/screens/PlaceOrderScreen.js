import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUREST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
const storeReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, storeLoading: true };
    case 'FETCH_SUCCESS':
      return { ...state, stores: action.payload, storeLoading: false };
    case 'FETCH_FAIL':
      return { ...state, storeLoading: false, storeError: action.payload };
    default:
      return state;
  }
};
export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
    // error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  const placeOrderHandler = async () => {};

  const [{ storeLoading, storeError, stores }, storeDispatch] = useReducer(
    storeReducer,
    {
      storeLoading: true,
      storeError: '',
      stores: [],
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      storeDispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/stores');
        storeDispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        storeDispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pickup Location</Card.Title>
              {storeLoading ? (
                <LoadingBox />
              ) : storeError ? (
                <MessageBox variant="danger">{storeError}</MessageBox>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Store Name: </strong>
                    {stores.map((store) =>
                      store.slug === cart.pickUpLocation ? store.name : ''
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Store Address: </strong>
                    {stores.map((store) =>
                      store.slug === cart.pickUpLocation ? store.address : ''
                    )}
                    ,{' '}
                    {stores.map((store) =>
                      store.slug === cart.pickUpLocation ? store.city : ''
                    )}
                  </ListGroup.Item>
                </ListGroup>
              )}
              {/* <Card.Text>
                <strong>Name:</strong> {cart.pickUpLocation} <br />
              </Card.Text> */}
              <Link className="m3-auto" to="/cart">
                Edit
              </Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>{' '}
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name} </Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>
                        <span>${item.price}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                  >
                    Book now
                  </Button>
                </div>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
