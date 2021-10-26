import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AddReview } from './components/AddReview';
import { Login } from './components/Login';
import { Movie } from './components/Movie';
import { MoviesList } from './components/MoviesList';

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <>
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">
                <Link to={'/movies'}>Movies</Link>
              </Nav.Link>
              <Nav.Link href="#link">
                {user ? (
                  <a href="/" onCLick={logout}>
                    Log out user
                  </a>
                ) : (
                  <Link to={'/login'}>Login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path={['/', '/movies']} component={MoviesList}></Route>
          <Route
            path="/movies/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
          ></Route>
          <Route
            path="/movies/:id"
            render={(props) => <Movie {...props} user={user} />}
          ></Route>
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          ></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
