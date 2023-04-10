import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication.js";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { CelebrationTwoTone } from "@mui/icons-material";
import "./login.css";
//import TextField from '@mui/material/TextField';

function Login() {
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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.password) {
      setErrorMessage("All fields are required.");
    } else {
      try {
        await auth.loginUser(formData.email, formData.password);
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
      <form class="card">
        <Card sx={{ maxWidth: 345 }} class="inner">
          <CardContent>
            <div class="right">
              <div class="user">
                <Avatar
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "#5ea0d6",
                  }}
                >
                  <CelebrationTwoTone
                    style={{ width: "60px", height: "60px" }}
                  />
                </Avatar>
              </div>
              <div class="loginletter">
                <Typography variant="h3" component="div">
                  Login
                </Typography>
              </div>
              <div class="caption">
                <Typography>
                  Start your journey with us! We are happy to welcome you back.
                  Noot is a housing app developed by ut students aiming to make
                  finding housing easier for current/prospective ut students.
                </Typography>
              </div>
              <div class="loginelement">
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  style={{ width: "500px" }}
                />
              </div>
              <div class="loginelement">
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  style={{ width: "500px" }}
                />
              </div>
              <div class="loginelement">
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  style={{ width: "500px" }}
                >
                  Login
                </Button>
              </div>
              <div class="loginelement">
                <Typography>
                  Don't have an account yet?{" "}
                  <a href="/signup" style={{ color: "blue" }}>
                    Join here
                  </a>
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default Login;
