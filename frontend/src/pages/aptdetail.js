import {React, useState, useEffect} from "react";
import {Button, Card, Row, Col, Form, Modal, ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useParams} from 'react-router-dom';

const AptDetail = () => {
  const {aptid} = useParams();

  const [apt, setApt] = useState([]);

  const [review, setReview] = useState("");
  const [floorplan, setFloorplan] = useState("");
  const [title, setTitle] = useState("");
  const [cleanliness, setCleanliness] = useState(-1);
  const [maintenance, setMaintenance] = useState(-1);
  const [amenities, setAmenities] = useState(-1);
  const [conditions, setConditions] = useState(-1);

  const [button, setButton] = useState(false);

  const email = window.localStorage.getItem("username");

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

  useEffect(()=> {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    const postReview = async () =>
    await fetch("http://localhost:4000/add-review", 
    {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          "email": email,
          "apt_id": aptid,
          "comment": review,
          "title": title,
          "floorplan": floorplan,
          "cleanliness": cleanliness,
          "maintenance": maintenance,
          "amenities": amenities,
          "conditions": conditions,
          "timestamp": timestamp,
        })
      }
    )
    .then(response => response.json());
    //.then(() => setReview(""));
    if (button) postReview();
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
      <h2>Floor Plans:</h2>
      <Row xs={1} md={3} className="g-4">
        {apt["floor_plans"] && apt["floor_plans"].map((fp) => 
          <div>
            <br />
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{fp["name"]}</Card.Title>
                  <Card.Text>
                  Cost*: {fp["cost"]}<br />
                  {fp["br"]} BR | {fp["ba"]} BA <br />
                  Per-room: {fp["is_double"] ? "DOUBLE" : "SINGLE"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </div>
        )}
      </Row>
      <br />
      <h2>Amenities:</h2>
      <div class="aptgrid">
      <Row xs={1} md={6} className="g-4">
        {apt["amenities"] && apt["amenities"].map((amenity) => 
          <div>
            <br />
            <Col>
              <Card bg={'info'}>
                <Card.Body>
                  <Card.Title>{amenity}</Card.Title>
                  <Card.Text>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </div>
        )}
      </Row>
      </div>
      <br />
      <h2>Additional Fees to Know:</h2>
      <Row xs={1} md={6} className="g-4">
        {apt["fees"] && apt["fees"].map((fee) => 
          <div>
            <br />
            <Col>
              <Card class="aptcard">
                <Card.Body>
                  <Card.Title>{fee["name"]}</Card.Title>
                  <Card.Text>
                  Interval: {fee["interval"]}<br />
                  Amount: ${fee["amount"]}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </div>
        )}
      </Row>
      <br />
      <h2>Add Your Review</h2>
      {email ? <div>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Add comment here</Form.Label>
        
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Form.Control onChange={event => setTitle(event.target.value)} placeholder="Give us a tldr :)" as="textarea" rows={1} />
          </Col>
          <Col>
            <Form.Select value={floorplan} onChange={(e) => setFloorplan(e.target.value)} aria-label="Floor Plan Selector">
            {apt["floor_plans"] && apt["floor_plans"].map((fp) => 
              <option value={fp["name"]}>{fp["name"]}</option>
            )}
            </Form.Select>
          </Col>
        </Row>
        <br />
        <Row xs={1} md={4} className="g-4">
          <Col>
            Cleanliness: {cleanliness >= 0 ? cleanliness + "/10" : "Rate Here"} <br />
            <Form.Range min={0} max={10} onChange={event => setCleanliness(event.target.value)}/>
          </Col>
          <Col>
            Maintenance: {maintenance >= 0 ? maintenance + "/10" : "Rate Here"} <br />
            <Form.Range min={0} max={10} onChange={event => setMaintenance(event.target.value)} />
          </Col>
          <Col>
            Amenities: {amenities >= 0 ? amenities + "/10" : "Rate Here"} <br />
            <Form.Range min={0} max={10} onChange={event => setAmenities(event.target.value)} />
          </Col>
          <Col>
            Conditions & Management: {conditions >= 0 ? conditions + "/10" : "Rate Here"} <br />
            <Form.Range min={0} max={10} onChange={event => setConditions(event.target.value)} />
          </Col>
        </Row>
        <br />
        <Form.Control onChange={event => setReview(event.target.value)} placeholder="Enlighten us!" as="textarea" rows={3} />
        <br />
        <Button type="button" onClick={() => setButton(!button)}>Submit</Button>
        </Form.Group>
        </Form>
      </div> : <p>Log in to leave a review.</p>}
      <br />
      {email ? 
      <div>
        <h3>Reviews: </h3>
        {apt["reviews"] ? apt["reviews"].map((review) => {
          return (
            <div>
              <Card>
                <Card.Header>For {review["floorplan"]}, made on {Date(review["timestamp"])}</Card.Header>
                
                <Card.Body>
                <Row xs={1} md={4} className="g-4">
                  <Col>
                    Cleanliness:
                    <ProgressBar now={review["cleanliness"]*10} label={`${review["cleanliness"]}/10`} />
                  </Col>
                  <Col>
                    Maintenance:
                    <ProgressBar now={review["maintenance"]*10} label={`${review["maintenance"]}/10`} />
                  </Col>
                  <Col>
                    Amenities:
                    <ProgressBar now={review["amenities"]*10} label={`${review["amenities"]}/10`} />
                  </Col>
                  <Col>
                    Conditions & Management:
                    <ProgressBar now={review["conditions"]*10} label={`${review["conditions"]}/10`} />
                  </Col>
                </Row>
                <br />
                <blockquote className="blockquote mb-0">
                  <h4>{review['title']}</h4>
                  <p>
                    {' '}
                    {review['review']}{' '}
                  </p>
                  <footer className="blockquote-footer">
                    {review['name']}
                  </footer>
                </blockquote>
                </Card.Body>
              </Card>
            </div>
          );
        }) : <p>No reviews yet.</p>}
      </div>
      : <p>Review not viewable before log in.</p>}
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
