import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication.js";

const Myapts = () => {
    const [apts, setApts] = useState([]);

    const auth = useContext(AuthContext);

    const email = window.localStorage.getItem("username");

    console.log(email);

    const navigate = useNavigate();

    

    useEffect(()=> {
        const fetchApts = async () =>
        await fetch("http://localhost:4000/get-user", 
        {
            method: "POST",
            body: JSON.stringify(
                {
                    "email": email,
                })
            }
        )
        .then(response => response.json())
        .then(data => setApts(data[0]["apts"]));
        if (!auth.loggedIn) {
            navigate("/");
        }
        fetchApts();
    }, [])

    return (
    <div>
        <h1>My Apartments</h1>
        <p>
            {JSON.stringify(apts)}
        </p>
        <ul>
            {apts.map(apt => {
                return <li>{apt}</li>
            })}
        </ul>
    </div>
    );
  };
  
  export default Myapts;