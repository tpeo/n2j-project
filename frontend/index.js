import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnPFBkkXNEvIsENdYWVHiPDjHRWwOAx2A",
  authDomain: "housing-app-f3e66.firebaseapp.com",
  projectId: "housing-app-f3e66",
  storageBucket: "housing-app-f3e66.appspot.com",
  messagingSenderId: "117949348437",
  appId: "1:117949348437:web:aa9dc1ee0d9f06641ef2dc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// createUser("abc@gmail.com", "abcdef");
loginUser("abc@gmail.com", "abcdef");
