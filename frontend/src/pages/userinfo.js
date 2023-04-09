import React, {useEffect, useState, useContext} from "react";
import {Button, Card, Modal, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import AuthContext from "../context/authentication.js";

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
                    "email": email,
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
                    "email": email,
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
      }
    
      const handleClose = () => {
        //setModalBody("To see the comment, reload the page.");
        setButton(false);
        setModalShow(false);
      };

    return (
    <div class="aptlist">
        <h1>My Apartments</h1>
        {user &&
        <div>
            <Card>
            <Card.Header>Welcome!</Card.Header>
            <Card.Title>
                See your Apartments below.
            </Card.Title>
            </Card>
            <br />
            {apts && apts.map((apt) =>
            <Card>
                <Card.Title>{apt["name"]}</Card.Title>
            </Card>
            )}
        </div>}
        <br />
        <h1>Add Apartment to your List</h1>
        <Form>
            <Form.Control
              onChange={(event) => setAptid(event.target.value)}
              placeholder="Enter Apartment ID"
            />
            <Button variant="primary" type="button" onClick={handleSubmit}>Add</Button>
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
    );
  };
  
  export default UserInfo;