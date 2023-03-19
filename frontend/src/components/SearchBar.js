import React from "react";
import {Form, Button, Col, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


const SearchBar = ({ placeholder, data }) => {
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
