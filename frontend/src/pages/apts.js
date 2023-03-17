import React, {useEffect, useState} from "react";
import {Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
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
        <p>
            {apts && apts.map((apt) => <Card>
                <Card.Title>{apt["name"]}</Card.Title>
                <Card.Body>{apt["apt_id"]}</Card.Body>
                <Card.Body>{apt["rating"]}</Card.Body>
                <Button>See More</Button>
            </Card>
            )}
        </p>
    </div>
    );
  };
  
  export default Apts;