import React, {useEffect, useState, useContext} from "react";
import {Button, Card, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import SearchBar from "../components/SearchBar.js";
import AuthContext from "../context/authentication.js";

const Myapts = () => {
    const [apts, setApts] = useState([]);

    const auth = useContext(AuthContext);

    const email = window.localStorage.getItem("username");

    console.log(email);
    

    const fetchApts = async () =>
    await fetch("http://localhost:4000/get-user-apts", 
    {
        method: "POST",
        body: JSON.stringify(
            {
                "email": email,
            })
        }
    )
    .then(response => response.json())
    .then(data => {setApts(data);});

    useEffect(()=> {
        fetchApts();
    }, []);

    return (
    <div class="aptlist">
        <h1>My Apartments</h1>
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
  
  export default Myapts;