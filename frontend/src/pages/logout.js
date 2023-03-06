import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication.js";
import { getAuth, signOut } from "firebase/auth";

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
            window.localStorage.setItem("loggedIn", false);
            window.localStorage.setItem("username", "");
            window.localStorage.setItem("token", ""); // Should be sent upon subsequent requests
            auth.loggedIn = false;
        } 
        else {
            setErrorMessage("Not logged in ---- you shouldn't be here.");
        }
    };
    
    return (
        <div className="login">
            <button onClick={handleLogout}>Log out</button>
        </div>

    );

}

export default Logout;