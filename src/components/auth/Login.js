import React, { useState } from "react";
import auth from "../../firebase"
import { signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit=(e)=>{
  e.preventDefault();
  signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    if (userCredential.user.accessToken) {
      localStorage.setItem("token", userCredential.user.accessToken);
      localStorage.setItem("name",userCredential.user.displayName)
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
    }).catch((err)=>{
      props.showAlert("User not signed up", "danger");
    })
    
  }
const googleProvider = new GoogleAuthProvider();
// Trigger Google Sign-In
const signInWithGoogle = () => {
  signInWithPopup(auth,googleProvider)
    .then((result) => {
      // You can access the Google user's information in result.user
      const user = result.user;
      console.log('Google Sign-In successful', user);
      console.log(user.accessToken)
      if (user.accessToken) {
        localStorage.setItem("token", user.accessToken);
        props.showAlert("Logged in successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    })
    .catch((error) => {
      console.error('Google Sign-In failed', error);
    });
  }
  return (
    <div className="container my-4">
      <h2>Login</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            aria-describedby="emailHelp"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
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
            value={password}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
    </div>
  );
}

