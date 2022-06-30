import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
function App() {
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
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <h1>Bike 'N' Go</h1>
                </Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
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
