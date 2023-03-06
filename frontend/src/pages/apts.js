import React, {useEffect, useState} from "react";

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
            {JSON.stringify(apts)}
        </p>
    </div>
    );
  };
  
  export default Apts;