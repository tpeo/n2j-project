import {React, useState, useEffect} from "react";
import {Button, Card, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useParams} from 'react-router-dom';

const AptDetail = () => {
  const {aptid} = useParams();

  const [apt, setApt] = useState([]);

  const fetchApt = async () =>
    await fetch("http://localhost:4000/get-apt", 
    {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                "apt_id": aptid
            })
        }
    )
    .then(response => response.json())
    .then(data => {setApt(data);});

    useEffect(()=> {
        fetchApt();
    }, [aptid]);

  return (
    <div class="scroll">
      <h1>{apt["name"] ? apt["name"] : "APARTMENT NOT FOUND"}</h1>
      <p>{aptid}</p>
      <p>{JSON.stringify(apt)}</p>
      <Row xs={1} md={2} className="g-4">
        {apt && apt["floor_plans"].map((fp) => 
          <div>
            <br />
            <Col>
              <Card>
                <Card.Title>{fp["cost"]}</Card.Title>
                <Card.Body>{fp["ba"]}</Card.Body>
                <Card.Body>{fp["br"]}</Card.Body>
                <Card.Body>{fp["is_double"]}</Card.Body>
              </Card>
            </Col>
          </div>
        )}
      </Row>
    </div>
  );
};

export default AptDetail;
