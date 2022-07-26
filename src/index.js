import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiKd02XrufKfrzqocVzrxOH8wvgSFWRXA",
  authDomain: "react-chat-app-d17e7.firebaseapp.com",
  databaseURL: "https://react-chat-app-d17e7-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-d17e7",
  storageBucket: "react-chat-app-d17e7.appspot.com",
  messagingSenderId: "545240889907",
  appId: "1:545240889907:web:4b9b8d55b587714cf34146"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
