import React, { useState } from "react";
import PasswordStrengthBar from "../components/PasswordStrengthBar";
import isLoggedIn from "../components/isLoggedIn";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { CiWarning } from "react-icons/ci";
import "./PassHealth.css";
import { Link } from "react-router-dom";

export default function PassHealth() {
  const isUserLoggedIn = isLoggedIn();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [missingRequirements, setMissingRequirements] = useState([]);

  if (!isUserLoggedIn) {
    window.location.href = "/";
    return null;
  }

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const checkPasswordRequirements = (value) => {
    const requirements = [];

    // Check length requirement
    if (value.length < 8) {
      requirements.push("at least 8 characters");
    }

    // Check uppercase letter requirement
    if (!/[A-Z]/.test(value)) {
      requirements.push("at least one uppercase letter");
    }

    // Check lowercase letter requirement
    if (!/[a-z]/.test(value)) {
      requirements.push("at least one lowercase letter");
    }

    // Check special character requirement
    if (!/[\W_]/.test(value)) {
      requirements.push("at least one special character");
    }

    setMissingRequirements(requirements);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordRequirements(value);
  };

  return (
    <div className="container my-4 px-5 py-4 w-50 rounded shadow bg-body-tertiary">
      <h3 className="text-center mb-3">Password Health Check</h3>
      <div className="row">
        <div className="col">
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <PasswordStrengthBar password={password} />
          {missingRequirements.length > 0 ? (
            <>
              <div
                className="mt-2 alert alert-warning border border-warning"
                role="alert"
              >
                <CiWarning /> Your password is missing{" "}
                {missingRequirements.join(", ")}
              </div>
              <div className="text-end">
                <Link to="/passgen">
                  <button className="btn btn-primary" type="button">
                    Generate New Password
                  </button>
                </Link>
              </div>
            </>
          ) : (
            password.length > 0 && (
              <div
                className="mt-2 alert alert-success border border-success"
                role="alert"
              >
                <AiFillCheckCircle /> Your password meets all requirements
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
