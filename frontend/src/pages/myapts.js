import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import AuthContext from "../context/authentication.js";

const Myapts = () => {
  const [apts, setApts] = useState([]);

  const auth = useContext(AuthContext);

  const email = window.localStorage.getItem("username");

  console.log(email);

  const fetchApts = async () =>
    await fetch("http://localhost:4000/get-user-apts", {
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
      <h1>My Apartments</h1>
      {!email ? (
        <p>
          <br />
          To use "My Apartments, log in first.
        </p>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {/* {apts && apts.map((apt) => 
            <div>
                <br />
                <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>{apt["name"]}</Card.Title>
                        <Card.Text>
                            Apartment ID: {apt["apt_id"]}<br />
                            Rating: {apt["rating"]}<br />
                            Address: {apt["address"]}<br />
                        </Card.Text>
                        <Button href={"/apts/" + apt["apt_id"]}>See More</Button>
                    </Card.Body>
                </Card>
                </Col>
            </div>
            )} */}
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
                        <Card.Title class="aptname">{apt["name"]}</Card.Title>
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
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </div>
            ))}
        </Row>
      )}
    </div>
  );
};

export default Myapts;
