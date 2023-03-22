import {Container, Nav, Navbar} from 'react-bootstrap';
import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/authentication.js";
import 'bootstrap/dist/css/bootstrap.min.css';


const Layout = () => {
  const [error, setError] = useState("");

  const auth = useContext(AuthContext);

  console.log(auth);

  useEffect(() => {
      if (error) {
          window.alert(error);
      }
  }, [error]);

  const handleLogout = async (event) => {
      event.preventDefault();
      if (auth.loggedIn) {
          auth.logout();
      } 
      else {
          setError("Not logged in ---- button should not work.");
      }
  };
  const email = window.localStorage.getItem("username");

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/apts">N2J</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/apts">All Apartments</Nav.Link>
            {email ? <Nav.Link href="/myapts">My Apartments</Nav.Link> : <p></p>}
            <Nav.Link href="/newapt" disabled>Submit New Apartment</Nav.Link>
            {email ? <Nav.Link onClick={handleLogout} href="/apts">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
            {email ? <p></p> : <Nav.Link href="/signup">Signup</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Layout;
