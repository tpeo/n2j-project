import React, {useEffect, useState, useContext} from "react";
import { Page, SearchInput, Card } from "react-onsenui";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication.js";

const Myapts = () => {
    const [apts, setApts] = useState([]);

    const [apt, setApt] = useState([]);

    const auth = useContext(AuthContext);

    const email = window.localStorage.getItem("username");

    console.log(email);

    const navigate = useNavigate();
    

    const fetchApts = async () =>
    await fetch("http://localhost:4000/get-user-apts", 
    {
        method: "POST",
        body: JSON.stringify(
            {
                "email": email,
            })
        }
    )
    .then(response => response.json())
    .then(data => {setApts(data);});

    useEffect(()=> {
        fetchApts();
    }, []);

    return (
    <div>
        <h1>My Apartments</h1>
        <p>
            {apts && apts.map((apt) => <Card>
                {apt["apt_id"]}
                {apt["name"]}
            </Card>
            )}
        </p>
        
    </div>
    );
  };
  
  export default Myapts;