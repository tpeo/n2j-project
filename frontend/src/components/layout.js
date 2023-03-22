import {Container, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Layout = () => {
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
            {email ? <Nav.Link href="/logout">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
            {email ? <p></p> : <Nav.Link href="/signup">Signup</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Layout;
