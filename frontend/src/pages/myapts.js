import React, { useEffect, useState, useContext } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Search } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./myapts.css";
import AuthContext from "../context/authentication.js";

const Myapts = () => {
  const [apts, setApts] = useState([]);

  const [name, setName] = useState("");

  const [button, setButton] = useState(false);

  useEffect(() => {
    const fetchApts = async () =>
      await fetch("https://n2j-project-backend.vercel.app/get-apts", {
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

  const auth = useContext(AuthContext);

  const email = window.localStorage.getItem("username");

  console.log(email);

  const fetchApts = async () =>
    await fetch("https://n2j-project-backend.vercel.app/get-user-apts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setApts(data);
      });

  useEffect(() => {
    fetchApts();
  }, []);

  return (
    <div class="aptlist">
      <Row className="g-0">
        <Col md={6} className="g-0">
          <div class="left">
            <h1>My Apartments</h1>
            <Form>
              <Row>
                <Col>
                  <div class="searchbar">
                    <div class="searchicon">
                      <Search onClick={() => setButton(!button)} />
                    </div>
                    <div>
                      <Form.Control
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Search by name"
                        style={{ width: "300px", border: "none" }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
            <div class="aptcards">
              <Row xs={1} md={2} className="g-4">
                {apts &&
                  apts.map((apt) => (
                    <div>
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
          </div>
        </Col>
        <Col md={6} className="g-0">
          <div class="right">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.3209627205215!2d-97.73624538482487!3d30.2849231141269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b59b2584cfb7%3A0x8131ee4f174a21de!2sThe%20University%20of%20Texas%20at%20Austin!5e0!3m2!1sen!2sus!4v1681102840582!5m2!1sen!2sus"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Myapts;
