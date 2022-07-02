import React, { useContext } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Button, Nav, NavDropdown } from 'react-bootstrap';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import StoreScreen from './screens/StoreScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('pickUpLocation');
    window.location.href = '/signin';
  };
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column site-container">
        <header className="App-header">
          <Navbar
            style={{
              paddingTop: '1rem',
              paddingBottom: '1rem',
            }}
            variant="light"
            expand="lg"
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <h1>Bike 'N' Go</h1>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/search" className="nav-link">
                    Products
                  </Link>
                  <Link to="/stores" className="nav-link">
                    Stores
                  </Link>
                  <div className="me-auto w-100 justify-content-end navbar-nav">
                    <Link to="/cart" className="nav-link">
                      Cart
                      {cart.cartItems.length > 0 && (
                        <Badge pill className="bg-dark ms-3">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </Badge>
                      )}
                    </Link>
                    {userInfo ? (
                      <NavDropdown
                        title={userInfo.name}
                        id="basic-nav-dropdown"
                      >
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>User Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orderhistory">
                          <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <Link
                          className="dropdown-item"
                          to="#signout"
                          onClick={signoutHandler}
                        >
                          Sign out
                        </Link>
                      </NavDropdown>
                    ) : (
                      <React.Fragment>
                        <Link className="nav-link" to="/signup">
                          <span className="dark-bgc nav-button">Register</span>
                        </Link>
                        <Link className="nav-link" to="/signin">
                          <span className="light-bgc nav-button">Sign In</span>
                        </Link>
                      </React.Fragment>
                    )}
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/stores" element={<StoreScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
              <Route path="/orderhistory" element={<OrderHistoryScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/search" element={<SearchScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className=" text-center p-3">All rights reserved @ STU91300</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
