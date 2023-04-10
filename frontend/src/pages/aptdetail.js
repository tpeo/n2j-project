import { React, useState, useEffect } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Form,
  Modal,
  ProgressBar,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import "./aptdetail.css";

const AptDetail = () => {
  const { aptid } = useParams();

  const [apt, setApt] = useState([]);

  const [review, setReview] = useState("");
  const [numReviews, setNumReviews] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [floorplan, setFloorplan] = useState("");
  const [title, setTitle] = useState("");
  const [cleanliness, setCleanliness] = useState(-1);
  const [maintenance, setMaintenance] = useState(-1);
  const [amenities, setAmenities] = useState(-1);
  const [conditions, setConditions] = useState(-1);

  const [button, setButton] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const email = window.localStorage.getItem("username");

  const mystyle = {
    background: "#E0E9EF",
    width: "160px",
    height: "160px",
    border: "none",
  };

  useEffect(() => {
    const fetchApt = async () =>
      await fetch("https://n2j-project-backend.vercel.app/get-apt", {
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
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    const postReview = async () =>
      await fetch("https://n2j-project-backend.vercel.app/add-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          apt_id: aptid,
          comment: review,
          title: title,
          floorplan: floorplan,
          cleanliness: cleanliness,
          maintenance: maintenance,
          amenities: amenities,
          conditions: conditions,
          timestamp: timestamp,
        }),
      }).then((response) => response.json());
    //.then(() => setReview(""));
    if (button) postReview();
  }, [button]);

  useEffect(() => {
    console.log(review);
  }, [review]);

  const handleSubmit = () => {
    console.log("submit");
    if (review === "") {
      setModalTitle("NOT");
      setModalBody("Please enter a review.");
    } else if (title === "") {
      setModalTitle("NOT");
      setModalBody("Please enter a title.");
    } else if (floorplan === "") {
      setModalTitle("NOT");
      setModalBody("Please select your floor plan.");
    } else if (
      cleanliness === -1 ||
      maintenance === -1 ||
      amenities === -1 ||
      conditions === -1
    ) {
      setModalTitle("NOT");
      setModalBody("Please select a rating for each category.");
    } else {
      setModalBody("To see the comment, reload the page.");
      setModalTitle("");
      setButton(true);
    }
    setModalShow(true);
  };

  const handleClose = () => {
    //setModalBody("To see the comment, reload the page.");
    setButton(false);
    setModalShow(false);
  };

  return (
    <div>
      <div class="image">
        {apt["aptimage"] && (
          <Image
            style={{
              width: "100%",
              height: "80vh",
              margin: "0",
              padding: "0",
            }}
            src={apt["aptimage"]}
            thumbnail
          />
        )}
        <div class="letter">
          <h1 class="aptitle">
            {apt["name"] ? apt["name"] : "APARTMENT NOT FOUND"}
          </h1>
          <h5 class="apaddress">
            {apt["address"] ? apt["address"] : "unknown address"}
          </h5>
        </div>
      </div>
      <div class="aptlist">
        <br />
        <h2>Sample Floor Plans</h2>
        <Row xs={1} md={3} className="g-4">
          {apt["floor_plans"] &&
            apt["floor_plans"].map((fp) => (
              <div>
                <br />
                <Col>
                  <Card style={{ background: "#E0E9EF", border: "none" }}>
                    <Card.Body>
                      <Image
                        style={{
                          width: "300px",
                          height: "300px",
                        }}
                        src={apt["floorplanimg"]}
                      />
                      {/* <Card.Title>
                        <h4>{fp["name"]}</h4>
                      </Card.Title> */}
                      {/* <Card.Text>
                        Cost*: {fp["cost"]}
                        <br />
                        {fp["br"]} BR | {fp["ba"]} BA <br />
                        Per-room: {fp["is_double"] ? "DOUBLE" : "SINGLE"}
                      </Card.Text> */}
                    </Card.Body>
                  </Card>
                  <h4>{fp["name"]}</h4>
                  <p>
                    Cost*: {fp["cost"]}
                    <br />
                    {fp["br"]} BR | {fp["ba"]} BA <br />
                    Per-room: {fp["is_double"] ? "DOUBLE" : "SINGLE"}
                  </p>
                </Col>
              </div>
            ))}
        </Row>
        <br />
        <h2>Amenities</h2>
        <div class="aptgrid">
          {apt["amenities"] &&
            apt["amenities"].map((amenity) => (
              <div class="items">
                <br />
                <Card style={mystyle}>
                  <Card.Body>
                    <Card.Title>
                      <div class="amenities">
                        <p class="amenitstyle">{amenity}</p>
                      </div>
                    </Card.Title>
                    <Card.Text></Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
        <br />
        <h2>Additional Fees</h2>
        <br />
        <div class="aptgrid">
          {apt["fees"] &&
            apt["fees"].map((fee) => (
              <div class="items">
                <br />
                <Card class="aptcard" style={mystyle}>
                  <Card.Body>
                    <Card.Title>
                      <div class="additfees">
                        <b>{fee["name"]}</b>
                      </div>
                    </Card.Title>
                    <Card.Text>
                      <div class="additfees">Interval: {fee["interval"]}</div>
                      <br />
                      <h2>
                        <b>${fee["amount"]}</b>
                      </h2>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
        <br />
        <br />
        {email ? (
          <div>
            <div class="avgbox">
              <div>
                <h2>Reviews </h2>
                <h2 class="avgrating">
                  {apt["reviews"] &&
                    parseFloat(
                      apt["reviews"].reduce(
                        (v, review) =>
                          (v =
                            v +
                            parseInt(review["cleanliness"], 10) +
                            parseInt(review["maintenance"], 10) +
                            parseInt(review["amenities"], 10) +
                            parseInt(review["conditions"], 10)),
                        0
                      ) / (4 * apt["reviews"].length).toFixed(1)
                    )}{" "}
                  / 10
                </h2>
                <p class="numreviews">
                  {apt["reviews"] && apt["reviews"].length} verified reviews
                </p>
              </div>
              <div class="vl"></div>
              <div class="ratingbars">
                <div class="ratingitems">
                  <p>Cleanliness</p>
                  <ProgressBar
                    now={
                      apt["reviews"] &&
                      parseFloat(
                        apt["reviews"].reduce(
                          (v, review) =>
                            (v = v + parseInt(review["cleanliness"], 10)),
                          0
                        ) / apt["reviews"].length.toFixed(1)
                      ) * 10
                    }
                    label={`${
                      apt["reviews"] &&
                      parseFloat(
                        apt["reviews"].reduce(
                          (v, review) =>
                            (v = v + parseInt(review["cleanliness"], 10)),
                          0
                        ) / apt["reviews"].length.toFixed(1)
                      )
                    }/10`}
                  />
                </div>
                <div class="ratingitems">
                  <p>Maintenance</p>
                  <ProgressBar
                    now={
                      apt["reviews"] &&
                      parseFloat(
                        apt["reviews"].reduce(
                          (v, review) =>
                            (v = v + parseInt(review["maintenance"], 10)),
                          0
                        ) / apt["reviews"].length.toFixed(1)
                      ) * 10
                    }
                    label={`${
                      apt["reviews"] &&
                      parseFloat(
                        apt["reviews"].reduce(
                          (v, review) =>
                            (v = v + parseInt(review["maintenance"], 10)),
                          0
                        ) / apt["reviews"].length.toFixed(1)
                      )
                    }/10`}
                  />
                </div>
              </div>
              <div style={{ width: "300px" }}>
                <div class="ratingitems">
                  <p>Amenities</p>
                  <ProgressBar
                    now={
                      apt["reviews"] &&
                      parseFloat(
                        apt["reviews"].reduce(
                          (v, review) =>
                            (v = v + parseInt(review["amenities"], 10)),
                          0
                        ) / apt["reviews"].length.toFixed(1)
                      ) * 10
                    }
                    label={`${
                      apt["reviews"] &&
                      parseFloat(
                        apt["reviews"].reduce(
                          (v, review) =>
                            (v = v + parseInt(review["amenities"], 10)),
                          0
                        ) / apt["reviews"].length.toFixed(1)
                      )
                    }/10`}
                  />
                </div>
                <div class="ratingitems">
                  <p>Conditions</p>
                  <ProgressBar
                    now={
                      apt["reviews"] &&
                      parseFloat(
                        apt["reviews"].reduce(
                          (v, review) =>
                            (v = v + parseInt(review["conditions"], 10)),
                          0
                        ) / apt["reviews"].length.toFixed(1)
                      ) * 10
                    }
                    label={`${
                      apt["reviews"] &&
                      parseFloat(
                        apt["reviews"].reduce(
                          (v, review) =>
                            (v = v + parseInt(review["conditions"], 10)),
                          0
                        ) / apt["reviews"].length.toFixed(1)
                      )
                    }/10`}
                  />
                </div>
              </div>
            </div>
            <br />
            <div class="hl"></div>
            {apt["reviews"] ? (
              apt["reviews"].map((review) => {
                return (
                  <div>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={review["name"]} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography>
                              <h4>{review["title"]}</h4>
                              <p class="reviewname">{review["name"]}</p>
                              <p class="reviewplan">{review["floorplan"]}</p>
                            </Typography>
                          }
                          secondary={
                            <Typography>
                              <Row xs={1} md={4} className="g-4">
                                <Col>
                                  <div classname="progressbar">Cleanliness</div>
                                  <ProgressBar
                                    now={review["cleanliness"] * 10}
                                    label={`${review["cleanliness"]}/10`}
                                  />
                                </Col>
                                <Col>
                                  <div classname="progressbar">Maintenance</div>
                                  <ProgressBar
                                    now={review["maintenance"] * 10}
                                    label={`${review["maintenance"]}/10`}
                                  />
                                </Col>
                                <Col>
                                  <div classname="progressbar">Amenities</div>
                                  <ProgressBar
                                    now={review["amenities"] * 10}
                                    label={`${review["amenities"]}/10`}
                                  />
                                </Col>
                                <Col>
                                  <div classname="progressbar">
                                    Conditions & Management
                                  </div>
                                  <ProgressBar
                                    now={review["conditions"] * 10}
                                    label={`${review["conditions"]}/10`}
                                  />
                                </Col>
                              </Row>
                              <br />
                              <div class="reviewcontent">
                                <p> {review["review"]} </p>
                                <p>
                                  <i>{Date(review["timestamp"])}</i>
                                </p>
                              </div>
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </List>
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
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Give us a tldr :)"
                      as="textarea"
                      rows={1}
                      style={{ width: "500px" }}
                    />
                    <br />
                    <Form.Select
                      value={floorplan}
                      onChange={(e) => setFloorplan(e.target.value)}
                      aria-label="Floor Plan Selector"
                      style={{ width: "500px" }}
                    >
                      <option value="">Select Floor Plan</option>
                      {apt["floor_plans"] &&
                        apt["floor_plans"].map((fp) => (
                          <option value={fp["name"]}>{fp["name"]}</option>
                        ))}
                    </Form.Select>
                    <br />
                    <Form.Control
                      onChange={(event) => setReview(event.target.value)}
                      placeholder="Enlighten us!"
                      as="textarea"
                      rows={3}
                      style={{ width: "500px" }}
                    />
                  </Col>
                  <Col>
                    Cleanliness:{" "}
                    {cleanliness >= 0 ? cleanliness + "/10" : "Rate Here"}{" "}
                    <br />
                    <Form.Range
                      min={0}
                      max={10}
                      onChange={(event) => setCleanliness(event.target.value)}
                      style={{ width: "400px" }}
                    />
                    <br />
                    Maintenance:{" "}
                    {maintenance >= 0 ? maintenance + "/10" : "Rate Here"}{" "}
                    <br />
                    <Form.Range
                      min={0}
                      max={10}
                      onChange={(event) => setMaintenance(event.target.value)}
                      style={{ width: "400px" }}
                    />
                    <br />
                    Amenities:{" "}
                    {amenities >= 0 ? amenities + "/10" : "Rate Here"} <br />
                    <Form.Range
                      min={0}
                      max={10}
                      onChange={(event) => setAmenities(event.target.value)}
                      style={{ width: "400px" }}
                    />
                    <br />
                    Conditions & Management:{" "}
                    {conditions >= 0 ? conditions + "/10" : "Rate Here"} <br />
                    <Form.Range
                      min={0}
                      max={10}
                      onChange={(event) => setConditions(event.target.value)}
                      style={{ width: "400px" }}
                    />
                  </Col>
                </Row>
                <br />
                <div class="submitbutton">
                  <Button type="button" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </div>
        ) : (
          <p>Log in to leave a review.</p>
        )}
        <br />
        <h2>Notes</h2>
        <p>
          Costs are per month, not including fees.
          <br />
          <br />
          We are not affiliated with any of the apartments listed on this site.
          While we make our best effort to keep information up-to-date, we are
          not able to guarantee the accuracy of the information provided. Please
          contact the apartment directly for more information.
        </p>
        <Modal show={modalShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Comment {modalTitle} submitted!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AptDetail;
