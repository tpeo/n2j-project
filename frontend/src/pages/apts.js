import React, {useEffect, useState} from "react";
import {Button, Card, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from "../components/SearchBar.js";
import '../App.css';

const Apts = () => {
    const [apts, setApts] = useState([]);

    const fetchData = () =>
    fetch("http://localhost:4000/get-all")
        .then(response => response.json())
        .then(data => setApts(data))

    useEffect(()=> {
        fetchData()
    }, [])
    
    console.log(apts);

    return (
    <div class="aptlist">
        <h1>Apartments</h1>
        <SearchBar />
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