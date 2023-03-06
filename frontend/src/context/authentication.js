import { initializeApp } from "firebase/app";
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useState } from "react";

let AuthContext = createContext();
export { AuthContext as default };

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnPFBkkXNEvIsENdYWVHiPDjHRWwOAx2A",
    authDomain: "housing-app-f3e66.firebaseapp.com",
    projectId: "housing-app-f3e66",
    storageBucket: "housing-app-f3e66.appspot.com",
    messagingSenderId: "117949348437",
    appId: "1:117949348437:web:aa9dc1ee0d9f06641ef2dc"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function useProvideAuth() {
    const [loggedIn, setLoggedIn] = useState(
      window.localStorage.getItem("loggedIn") === "true"
    );
    // given an email and password, adds user into database and returns a token in user.accessToken
    // this token should be saved inside windows.localStorage and sent alongside API requests
    const createUser = (email, password) => {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in : get token
            const user = userCredential.user;
            console.log(user.accessToken);
            console.log("Token successfully stored!");
            window.localStorage.setItem("loggedIn", true);
            window.localStorage.setItem("username", user.email);
            window.localStorage.setItem("token", user.accessToken); // Should be sent upon subsequent requests
            setLoggedIn(true);
            resolve();
          })
          .catch((error) => {
            console.log(error.message);
            reject(error.message);
          });
      });
    };
  
    // uses an email and password to check if the user is inside the database
    // if so, you can return a user.accessToken
    const loginUser = (email, password) => {
      return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.accessToken);
            console.log("Token successfully stored!");
            setLoggedIn(true);
            window.localStorage.setItem("loggedIn", true);
            window.localStorage.setItem("username", user.email);
            window.localStorage.setItem("token", user.accessToken); // Should be sent upon subsequent requests
            resolve();
          })
          .catch((error) => {
            console.log(error.message);
            reject(error.message);
          });
      });
    };
  
    function logout() {
      window.localStorage.clear();
      setLoggedIn(false);
    }
  
    return {
      createUser,
      loggedIn,
      loginUser,
      logout,
    };
  }
  

/*
export const createUser = (email, password) => {
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in : get token
    const user = userCredential.user;
    console.log(user);
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    });
};

export const loginUser = (email, password) => {
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log(user.accessToken);
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });
};
*/