import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./userinfo.css";
import AuthContext from "../context/authentication.js";
import { AddCircle } from "@mui/icons-material";

const UserInfo = () => {
  const [user, setUser] = useState([]);
  const [apts, setApts] = useState([]);
  const [aptid, setAptid] = useState("");
  const [button, setButton] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const auth = useContext(AuthContext);

  const email = window.localStorage.getItem("username");

  useEffect(() => {
    const fetchApts = async () =>
      await fetch("http://localhost:4000/get-user-apts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => setApts(data));
    fetchApts();
  }, []);

  useEffect(() => {
    const fetchUser = async () =>
      await fetch("http://localhost:4000/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) => setUser(data));
    fetchUser();
  }, []);

  useEffect(() => {
    const addApt = async () =>
      await fetch("http://localhost:4000/add-user-apt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          aptid: aptid,
        }),
      }).then((response) => response.json());
    //.then(() => setReview(""));
    if (button) addApt();
  }, [button]);

  const handleSubmit = () => {
    setModalBody("To see the comment, reload the page.");
    setModalTitle("");
    setButton(true);
    setModalShow(true);
  };

  const handleClose = () => {
    //setModalBody("To see the comment, reload the page.");
    setButton(false);
    setModalShow(false);
  };

  return (
    <div class="aptlist">
      <h2>User Profile</h2>
      {user && (
        <div>
          <div class="flexcontainer">
            <div class="aptcards">
              <i>
                {email ? <p>Welcome! See your apartments below:</p> : <p>To use this page, please log in first.</p>}
              </i>
              <Row xs={1} md={2} className="g-4">
                {apts &&
                  apts.map((apt) => (
                    <div class="widthadjust">
                      <br />
                      <Col>
                        <a href={"/apts/" + apt["apt_id"]}>
                          <Card class="entirecard">
                            <Card.Body>
                              <Card.Img
                                variant="top"
                                src={apt["aptimage"]}
                                class="images"
                              />
                              <br />
                              <Card.Title class="aptname">
                                {apt["name"]}
                              </Card.Title>
                              <Card.Text class="content">
                                Apartment ID: {apt["apt_id"]}
                                <br />
                                Rating:{" "}
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
                                  )}
                                <br />
                                {apt["address"]}
                                <br />
                              </Card.Text>
                              {/* <Button href={"/apts/" + apt["apt_id"]}>See More</Button> */}
                            </Card.Body>
                          </Card>
                        </a>
                      </Col>
                    </div>
                  ))}
              </Row>
            </div>
            <div class="addnew">
              <h2>Add Apartment to your List</h2>
              <Form>
                <div class="addbar">
                  <AddCircle
                    onClick={handleSubmit}
                    style={{ color: "#f2c87d", margin: "10px" }}
                  />
                  <Form.Control
                    onChange={(event) => setAptid(event.target.value)}
                    placeholder="Enter Apartment ID"
                    style={{ width: "400px", border: "none" }}
                  />
                </div>
              </Form>
              <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Apartment {modalTitle} added!</Modal.Title>
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
        </div>
      )}
      <br />
    </div>
  );
};

export default UserInfo;
