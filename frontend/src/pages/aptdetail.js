import {React, useState, useEffect} from "react";
import {Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useParams} from 'react-router-dom';

const AptDetail = () => {
  const {aptid} = useParams();

  const [apt, setApt] = useState([]);

  const fetchApt = async () =>
    await fetch("http://localhost:4000/get-apt", 
    {
        method: "POST",
        body: JSON.stringify(
            {
                "apt_id": aptid
            })
        }
    )
    .then(response => response.json())
    .then(data => {setApt(data);});

    useEffect(()=> {
        fetchApt();
    }, [aptid]);

  return (
    <div class="scroll">
      <h1>{apt["name"] ? apt["name"] : "APARTMENT NOT FOUND"}</h1>
      <p>{aptid}</p>
      <p>{JSON.stringify(apt)}</p>
    </div>
  );
};

export default AptDetail;
