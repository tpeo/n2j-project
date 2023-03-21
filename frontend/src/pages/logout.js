import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication.js";
import { getAuth, signOut } from "firebase/auth";
import { Button } from '@mui/material';


function Logout() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    console.log(auth);

    //const { user, setUser } = useContext(auth);

    useEffect(() => {
        if (!auth.loggedIn) {
            navigate("/");
        }
    });

    useEffect(() => {
        if (error) {
            window.alert(error);
        }
    }, [error]);

    const handleLogout = async (event) => {
        event.preventDefault();
        if (auth.loggedIn) {
            auth.logout();
        } 
        else {
            setErrorMessage("Not logged in ---- you shouldn't be here.");
        }
    };
    
    return (
        <div className="login">
            <Button variant="contained" onClick={handleLogout}>Log Out</Button>
        </div>
    );

}

export default Logout;