import React, {useEffect, useState, useContext} from "react";
import {Button, Card, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import AuthContext from "../context/authentication.js";

const UserInfo = () => {
    const [user, setUser] = useState([]);
    const [apts, setApts] = useState([]);

    const auth = useContext(AuthContext);

    const email = window.localStorage.getItem("username");

    console.log(email);
    
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

    const fetchUser = async () =>
    await fetch("http://localhost:4000/get-user", 
    {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                "email": email,
            })
        }
    )
    .then(response => response.json())
    .then(data => {setUser(data);});

    useEffect(()=> {
        fetchUser();
    }, []);

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
    </div>
    );
  };
  
  export default UserInfo;