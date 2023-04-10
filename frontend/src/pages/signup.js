import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";

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
      navigate("/apts");
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
    } else {
      try {
        createUserWithEmailAndPassword(
          getAuth(),
          formData.email,
          formData.password
        );
        navigate("/apts");
        setErrorMessage("");
      } catch (error) {
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
    <div class="aptlist">
      <h1>Welcome</h1>
      <br />
      <form>
        <p>Email</p>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          onChange={handleChange}
          style={{ width: "600px", height: "50px" }}
        />
        <br />
        <br />
        <br />
        <p>Password</p>
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          onChange={handleChange}
          style={{ width: "600px", height: "50px" }}
        />
        <br />
        <br />
        <br />
        <Button variant="contained" onClick={handleSignup}>
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default Signup;
