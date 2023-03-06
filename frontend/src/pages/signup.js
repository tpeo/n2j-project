import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
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
        if (auth.loggedIn) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (error) {
            window.alert(error);
        }
    }, [error]);

    const handleSignup = async (event) => {
        event.preventDefault();
        console.log(formData);
        if (!formData.email || !formData.password) {
            setErrorMessage("All fields are required.");
        } 
        else {
            try {
                createUserWithEmailAndPassword(getAuth(), formData.email, formData.password);
                navigate("/");
                setErrorMessage("");
            } 
            catch (error) {
                setErrorMessage(error);
            }
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    
    return (
        <div className="signup">
            <form>
                <h1>Email: </h1> 
                <input type="text" name="email" onChange={handleChange} />
                <h1>Password:</h1>
                <input type="password" name="password" onChange={handleChange} />
                <button onClick={handleSignup}>Sign Up</button>
            </form>
        </div>

    );

}

export default Signup;