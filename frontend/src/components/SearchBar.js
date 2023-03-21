import {React, useEffect} from "react";
import {Form, Button, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const SearchBar = () => {
  useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key);
  
      if (event.key === 'Enter') {
        event.preventDefault();
        console.log('User pressed enter');
      }
    };
  
    document.addEventListener('keydown', keyDownHandler);
  
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  
  return (
    <Form>
      <Row>
        <Col><Form.Label>Search for Apartments</Form.Label></Col>
      </Row>
      <Row>
          <Col><Form.Control placeholder="Enter name" /> </Col>
          <Col><Button variant="primary" type="submit">Search</Button></Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
