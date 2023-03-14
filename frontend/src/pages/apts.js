import React, {useEffect, useState} from "react";
import { Page, SearchInput, Card } from "react-onsenui";

const Apts = () => {
    const [apts, setApts] = useState([]);

    const fetchData = () =>
    fetch("http://localhost:4000/get-all")
        .then(response => response.json())
        .then(data => setApts(data))

    useEffect(()=> {
        fetchData()
    }, [])
    
    console.log(apts);

    return (
    <div>
        <h1>Apartments</h1>
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
  
  export default Apts;