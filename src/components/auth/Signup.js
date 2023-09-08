import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import auth from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
export default function Signup(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        if (userCredential.user.accessToken) {
          localStorage.setItem("token", userCredential.user.accessToken);
          updateProfile(userCredential.user, {
            displayName: name,
          });
          console.log(userCredential.user.displayName);
          localStorage.setItem("name", name);
          props.showAlert("Account created successfully", "success");
          navigate("/");
        } else {
          props.showAlert("User already exists", "danger");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const googleProvider = new GoogleAuthProvider();

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // You can access the Google user's information in result.user
        const user = result.user;
        console.log("Google Sign-Up successful", user);
        if (user.accessToken) {
          localStorage.setItem("token", user.accessToken);
          props.showAlert("Logged in successfully", "success");
          navigate("/");
        } else {
          props.showAlert("Invalid Credentials", "danger");
        }
      })
      .catch((error) => {
        console.error("Google Sign-Up failed", error);
      });
  };

  return (
    <div className="container my-4">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div id="email" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            minLength={5}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button onClick={signUpWithGoogle}>Sign Up With Google</button>
    </div>
  );
}
