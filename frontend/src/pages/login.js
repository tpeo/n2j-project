import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authentication.js";
import { Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword} from "firebase/auth";
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
            navigate("/");
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
        console.log(auth);
        if (!formData.email || !formData.password) {
            setErrorMessage("All fields are required.");
        } 
        else {
            try {
                /*
                signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user.accessToken);
                    console.log(user.email);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
                */
                await auth.loginUser(formData.email, formData.password);
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
        <div className="login">
            <form>
                <h1>Email: </h1> 
                <TextField id="email" label="Email" variant="outlined" type="text" name="email" onChange={handleChange} />
                <h1>Password:</h1>
                <TextField id="password" label="Password" variant="outlined" type="password" name="password" onChange={handleChange} />
                <br />
                <Button variant="contained" onClick={handleLogin}>Login</Button>
            </form>
        </div>

    );

}

export default Login;