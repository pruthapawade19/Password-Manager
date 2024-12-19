import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [customSecurityQuestion, setCustomSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [isCustomQuestion, setIsCustomQuestion] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const database = firebase.database().ref("users").child(phone);
    setMessage("");
    if (password !== conformPassword) {
      setMessage("Password does not match");
      return;
    }

    const user = {
      name,
      phone,
      email,
      securityQuestion,
      securityAnswer,
      customSecurityQuestion,
      password,
    };

    database.set(user);
    alert("You have successfully registered");

    setPassword("");
    setConformPassword("");
    setName("");
    setPhone("");
    setEmail("");
    setSecurityQuestion("");
    setSecurityAnswer("");
    setCustomSecurityQuestion("");
    setIsCustomQuestion(false);

  };
  const handleReset = (e) => {
    e.preventDefault();
    alert("You clicked on reset button");
  };

  const handleSecurityQuestionChange = (e) => {
    if (e.target.value === "custom") {
      setIsCustomQuestion(true);
    } else {
      setCustomSecurityQuestion("");
      setIsCustomQuestion(false);
    }
    setSecurityQuestion(e.target.value);
  };

  const handleSecurityAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
  };

  return (
    <div className="container shadow rounded my-5 w-50 p-4 bg-body-tertiary">
      <form onSubmit={handleRegister}>
        <h3 className="text-center">Register</h3>
        {message && (
          <>
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </>
        )}

        <div className="row">
          <div className="mb-3 col-12">
            <label htmlFor="name">
              Name<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="phone">
              Phone Number<span className="text-danger"> *</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="phone"
              required
            />
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="email">
              Email<span className="text-danger"> *</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-12">
            <label htmlFor="password">
              Password<span className="text-danger"> *</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-12">
            <label htmlFor="conformPassword">
              Conform Password<span className="text-danger"> *</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="conformPassword"
              value={conformPassword}
              required
              onChange={(e) => setConformPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="securityQuestion">
              Security Question<span className="text-danger"> *</span>
            </label>
            <select
              className="form-select mb-3"
              aria-label="Select a security question"
              onChange={handleSecurityQuestionChange}
              required
            >
              <option value="">--Select a security question--</option>
              <option value="What is your mother's maiden name?">
                What is your mother's maiden name?
              </option>
              <option value="What is your favorite color?">
                What is your favorite color?
              </option>
              <option value="What city were you born in?">
                What city were you born in?
              </option>
              <option value="custom">Enter custom question</option>
            </select>
            {isCustomQuestion && (
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter your custom question"
                value={customSecurityQuestion}
                onChange={(e) => setCustomSecurityQuestion(e.target.value)}
                required
              />
            )}
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="securityAnswer">
              Security Answer<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="securityAnswer"
              value={securityAnswer}
              onChange={handleSecurityAnswerChange}
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-12 text-lg-end text-md-center p-0">
            <button
              type="reset"
              className="btn btn-secondary w-50 m-3"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          <div className="mb-3 col-lg-6 col-md-12 text-lg-start text-md-center p-0">
            <button type="submit" className="btn btn-primary w-50 m-3 ">
              Register
            </button>
          </div>
          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/">Login here</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}