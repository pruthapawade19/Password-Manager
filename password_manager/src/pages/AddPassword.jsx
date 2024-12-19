import React, { useState, useEffect } from "react";
import isLoggedIn from "../components/isLoggedIn";
import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
firebase.initializeApp(firebaseConfig);

export default function AddPassword() {
    const [website, setWebsite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [keyWords, setKeyWords] = useState("");
    const [encryptionType, setEncryptionType] = useState("");
    // Simpele Columnar Transposition, Multiple Columnar Tranposition, Rail Fence.
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        const isUserLoggedIn = isLoggedIn();
        if (!isUserLoggedIn) {
            window.location.href = "/";
        }

        // set last updated to current date and time
        setLastUpdated(new Date().toISOString().slice(0, 10));
    }, []);

    const resetForm = () => {
        setWebsite("");
        setUsername("");
        setPassword("");
        setKeyWords("");
        setEncryptionType("");
    }

    const handleAddPassword = (e) => {
        e.preventDefault();
        const database = firebase
            .database()
            .ref("users")
            .child(localStorage.getItem("user"))
            .child("passwords");

        let encryptedPassword = password;
        if (encryptionType === "Simple-columnar") {
            const data = { message: password };
            fetch("http://localhost:5000//simplecolumnar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.cipher);
                    encryptedPassword = data.cipher;
                    database.push({
                        website,
                        username,
                        password: encryptedPassword,
                        keyWords,
                        encryptionType,
                        lastUpdated,
                    });
                }).catch((error) => {
                    console.error('Error:', error);
                    alert("Something went wrong. Please try again later.");
                    }
                ).finally(() => {
                    resetForm();
                    alert("Password added successfully.");
                });


            // encryptedPassword = simpleColumnarTransposition(password, 4);
        }else if(encryptionType === "Multiple-columnar"){
            const data = { message: password };
            fetch("http://localhost:5000//multiplecolumnar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.cipher);
                    encryptedPassword = data.cipher;
                    database.push({
                        website,
                        username,
                        password: encryptedPassword,
                        keyWords,
                        encryptionType,
                        lastUpdated,
                    });
                }).catch((error) => {
                    console.error('Error:', error);
                    alert("Something went wrong. Please try again later.");
                    }
                ).finally(() => {
                    resetForm();
                    alert("Password added successfully.");
                });

        }else if (encryptionType === "Rail-fence") {
            const data = { message: password };
            fetch("http://localhost:5000//railfence", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.cipher);
                    encryptedPassword = data.cipher;
                    database.push({
                        website,
                        username,
                        password: encryptedPassword,
                        keyWords,
                        encryptionType,
                        lastUpdated,
                    });
                }).catch((error) => {
                    console.error('Error:', error);
                    alert("Something went wrong. Please try again later.");
                  }
                ).finally(() => {
                    resetForm();
                    alert("Password added successfully.");
                });
        }
    };

    return (
        <div className="container mx-auto w-75 shadow rounded  my-4 p-4 bg-body-tertiary">
            <form className="row" onSubmit={handleAddPassword}>
                <h3 className="text-center">Add Password</h3>
                <div className="mb-3">
                    <label htmlFor="website" className="form-label">
                        Website
                    </label>
                    
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="form-control"
                        id="website"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        id="username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="password"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="encryptionType" className="form-label">
                        Encryption Type
                    </label>
                    <select
                        className="form-select"
                        id="encryptionType"
                        value={encryptionType}
                        onChange={(e) => setEncryptionType(e.target.value)}
                        required
                    >
                        <option value="">Select Encryption Type</option>
                        <option value="Simple-columnar">
                            Simple Columnar Transposition
                        </option>
                        <option value="Multiple-columnar">
                            Multiple Columnar Transposition
                        </option>
                        <option value="Rail-fence">Rail Fence</option>
                    </select>
                </div>

                {/* key words for search */}
                <div className="mb-3">
                    <label htmlFor="keyWords" className="form-label">
                        Key Words
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="keyWords"
                        value={keyWords}
                        onChange={(e) => setKeyWords(e.target.value)}
                        required
                    />
                    <div id="passwordHelpBlock" className="form-text">
                        Enter key words for search, separated by commas.
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="text-lg-end text-center mb-2">
                        <button
                            type="reset"
                            className="px-4 btn w-25 btn-secondary"
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 ">
                    <div className="text-lg-start text-center">
                        <button
                            type="submit"
                            className="px-4 w-25 btn btn-primary"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
