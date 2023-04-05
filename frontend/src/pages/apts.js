import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Apts = () => {
  const [apts, setApts] = useState([]);

  const [name, setName] = useState("");

  const [button, setButton] = useState(false);

  useEffect(() => {
    const fetchApts = async () =>
      await fetch("http://localhost:4000/get-apts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
        }),
      })
        .then((response) => response.json())
        .then((data) => setApts(data));
    fetchApts();
    console.log(name);
  }, [button]);

  useEffect(() => {
    console.log(name);
  }, [name]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();
        console.log("User pressed enter");
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div class="aptlist">
      <h1>Home</h1>
      <Form>
        <Row>
          <Col>
            <Form.Label>Search for Apartments</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter name"
            />{" "}
          </Col>
          <Col>
            <Button
              variant="primary"
              type="button"
              onClick={() => setButton(!button)}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row xs={1} md={2} className="g-4">
        {apts &&
          apts.map((apt) => (
            <div>
              <br />
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{apt["name"]}</Card.Title>
                    <Card.Text>
                      Apartment ID: {apt["apt_id"]}
                      <br />
                      Rating: {apt["reviews"] && parseFloat(apt["reviews"].reduce(
              (v, review) => (v = v + parseInt(review["cleanliness"], 10) + parseInt(review["maintenance"], 10) 
              + parseInt(review["amenities"], 10) + parseInt(review["conditions"], 10)) , 0)
              / (4 * apt["reviews"].length).toFixed(1))}
                      <br />
                      Address: {apt["address"]}
                      <br />
                    </Card.Text>
                    <Button href={"/apts/" + apt["apt_id"]}>See More</Button>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          ))}
      </Row>
    </div>
  );
};

export default Apts;
