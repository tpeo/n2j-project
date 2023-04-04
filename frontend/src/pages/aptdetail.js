import { React, useState, useEffect } from "react";
import { Button, Card, Row, Col, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import "./aptdetail.css";

const AptDetail = () => {
  const { aptid } = useParams();

  const [apt, setApt] = useState([]);

  const [review, setReview] = useState("");

  const [button, setButton] = useState(false);

  const email = window.localStorage.getItem("username");

  const mystyle = { background: "#E0E9EF" };

  useEffect(() => {
    const fetchApt = async () =>
      await fetch("http://localhost:4000/get-apt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apt_id: aptid,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setApt(data);
        });
    fetchApt();
  }, [aptid]);

  useEffect(() => {
    const postReview = async () =>
      await fetch("http://localhost:4000/add-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          apt_id: aptid,
          comment: review,
        }),
      }).then((response) => response.json());
    //.then(() => setReview(""));
    console.log("Effect triggered");
    postReview();
  }, [button]);

  useEffect(() => {
    console.log(review);
  }, [review]);

  const handleClose = () => {
    setButton(false);
  };

  return (
    <div class="aptlist">
      <h1>{apt["name"] ? apt["name"] : "APARTMENT NOT FOUND"}</h1>
      <h2>Floor Plans</h2>
      <Row xs={1} md={3} className="g-4">
        {apt["floor_plans"] &&
          apt["floor_plans"].map((fp) => (
            <div>
              <br />
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>{fp["name"]}</Card.Title>
                    <Card.Text>
                      Cost*: {fp["cost"]}
                      <br />
                      {fp["br"]} BR | {fp["ba"]} BA <br />
                      Per-room: {fp["is_double"] ? "DOUBLE" : "SINGLE"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          ))}
      </Row>
      <br />
      <h2>Amenities</h2>
      <div class="aptgrid">
        <Row xs={1} md={6} className="g-4">
          {apt["amenities"] &&
            apt["amenities"].map((amenity) => (
              <div>
                <br />
                <Col>
                  <Card style={mystyle}>
                    <Card.Body>
                      <Card.Title>{amenity}</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            ))}
        </Row>
      </div>
      <br />
      <h2>Additional Fees</h2>
      <br />
      <Row xs={1} md={6} className="g-4">
        {apt["fees"] &&
          apt["fees"].map((fee) => (
            <div>
              <br />
              <Col>
                <Card class="aptcard">
                  <Card.Body>
                    <Card.Title>{fee["name"]}</Card.Title>
                    <Card.Text>
                      Interval: {fee["interval"]}
                      <br />
                      Amount: ${fee["amount"]}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          ))}
      </Row>
      <br />
      <h2>Add Your Review</h2>
      {email ? (
        <div>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add comment here</Form.Label>

              <Row xs={1} md={2} className="g-4">
                <Col>
                  <Form.Control
                    onChange={(event) => setReview(event.target.value)}
                    placeholder="Give us a tldr :)"
                    as="textarea"
                    rows={1}
                  />
                </Col>
                <Col>
                  <Form.Select aria-label="Floor Plan Selector">
                    <option>Choose a floor plan</option>
                    {apt["floor_plans"] &&
                      apt["floor_plans"].map((fp) => (
                        <option>{fp["name"]}</option>
                      ))}
                  </Form.Select>
                </Col>
              </Row>
              <br />
              <Row xs={1} md={2} className="g-4">
                <Col>
                  Cleanliness: <br />
                  <Form.Range />
                </Col>
                <Col>
                  Cleanliness: <br />
                  <Form.Range />
                </Col>
              </Row>
              <br />
              <Row xs={1} md={2} className="g-4">
                <Col>
                  Cleanliness: <br />
                  <Form.Range />
                </Col>
                <Col>
                  Cleanliness: <br />
                  <Form.Range />
                </Col>
              </Row>
              <br />
              <Form.Control
                onChange={(event) => setReview(event.target.value)}
                placeholder="Enlighten us!"
                as="textarea"
                rows={3}
              />
              <br />
              <Button type="button" onClick={() => setButton(!button)}>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      ) : (
        <p>Log in to leave a review.</p>
      )}
      <br />
      {email ? (
        <div>
          <h3>Reviews: </h3>
          {apt["reviews"] ? (
            apt["reviews"].map((review) => {
              return (
                <div>
                  <Card>
                    <Card.Header>By: {review["name"]}</Card.Header>
                    <Card.Body>
                      <Card.Text>{review["review"]}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      ) : (
        <p>Review not viewable before log in.</p>
      )}
      <br />
      <h2>Notes</h2>
      <p>Costs are per month, not including fees.</p>
      <Modal show={button} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>To see the comment, reload the page.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AptDetail;
