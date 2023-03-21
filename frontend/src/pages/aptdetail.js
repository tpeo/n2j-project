import {React, useState, useEffect} from "react";
import {Button, Card, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useParams} from 'react-router-dom';

const AptDetail = () => {
  const {aptid} = useParams();

  const [apt, setApt] = useState([]);

  useEffect(()=> {
    const fetchApt = async () =>
    await fetch("http://localhost:4000/get-apt", 
    {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          "apt_id": aptid,
        })
      }
    )
    .then(response => response.json())
    .then(data => {setApt(data);});
    fetchApt();
  }, [aptid]);

  return (
    <div class="aptlist">
      <h1>{apt["name"] ? apt["name"] : "APARTMENT NOT FOUND"}</h1>
      <p>{aptid}</p>
      <p>{JSON.stringify(apt)}</p>
      <Row xs={1} md={3} className="g-4">
        {apt["floor_plans"] && apt["floor_plans"].map((fp) => 
          <div>
            <br />
            <Col>
              <Card>
                <Card.Title>{fp["cost"]}</Card.Title>
                <Card.Body>{fp["ba"]}</Card.Body>
                <Card.Body>{fp["br"]}</Card.Body>
                <Card.Body>{fp["is_double"] ? "DOUBLE" : "SINGLE"}</Card.Body>
              </Card>
            </Col>
          </div>
        )}
      </Row>
      <p>Per-month parking cost: {apt["parking_cost"] ? apt["parking_cost"] : "N/A"}</p>
    </div>
  );
};

export default AptDetail;
