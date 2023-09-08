// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACZ5XnNKAhLz_k0TVpD4HUr5fzczKqYLw",
  authDomain: "blog-website-4f514.firebaseapp.com",
  projectId: "blog-website-4f514",
  storageBucket: "blog-website-4f514.appspot.com",
  messagingSenderId: "797375211751",
  appId: "1:797375211751:web:17eb1529e115770f865a42"
};


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth