import {Container, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Layout = () => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">N2J</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/apts">All Apartments</Nav.Link>
            <Nav.Link href="/myapts">My Apartments</Nav.Link>
            <Nav.Link href="/newapt">Submit New Apartment</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Layout;
