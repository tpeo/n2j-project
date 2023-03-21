import React, {useEffect, useState} from "react";
import {Button, Card, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';

const Apts = () => {
    const [apts, setApts] = useState([]);

    const [name, setName] = useState("");

    const [button, setButton] = useState(false);

    useEffect(()=> {
        const fetchApts = async () =>
        await fetch("http://localhost:4000/get-apts", 
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "name": name,
                })
            }
        )
        .then(response => response.json())
        .then(data => setApts(data));
        fetchApts();
        console.log(name);
    }, [button])
    
    useEffect(()=> {
        console.log(name);
    }, [name])

    return (
    <div class="aptlist">
        <h1>Apartments</h1>
        <Form>
            <Row>
                <Col><Form.Label>Search for Apartments</Form.Label></Col>
            </Row>
            <Row>
                <Col><Form.Control onChange={event => setName(event.target.value)} placeholder="Enter name" /> </Col>
                <Col><Button variant="primary" type="button" onClick={() => setButton(!button)}>Search</Button></Col>
            </Row>
        </Form>
        <Row xs={1} md={2} className="g-4">
            {apts && apts.map((apt) => 
            <div>
                <br />
                <Col>
                    <Card>
                        <Card.Title>{apt["name"]}</Card.Title>
                        <Card.Body>{apt["apt_id"]}</Card.Body>
                        <Card.Body>{apt["rating"]}</Card.Body>
                        <Button href={"/apts/" + apt["apt_id"]}>See More</Button>
                    </Card>
                </Col>
            </div>
            )}
        </Row>
    </div>
    );
  };
  
  export default Apts;