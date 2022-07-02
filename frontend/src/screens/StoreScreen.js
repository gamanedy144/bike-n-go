import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

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
export default function StoreScreen() {
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
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Stores</title>
      </Helmet>
      <h1 className="mb-3">Bike N Go Stores</h1>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              {stores.map((store) => (
                <Row className="mb-3" key={store._id}>
                  <Card>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <h4>{store.name}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>{store.address}</ListGroup.Item>
                        <ListGroup.Item>{store.city}</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Row>
              ))}
            </Col>
            <Col md={4}>
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1Gx0PRqcT4FIF-tTY9ZJId23e4cfbKMQ&ehbc=2E312F"
                width="640"
                height="480"
              ></iframe>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
