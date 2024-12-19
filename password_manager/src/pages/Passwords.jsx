import React, { useState, useEffect } from "react";
import isLoggedIn from "../components/isLoggedIn";
import firebaseConfig from "../config/firebaseConfig";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";
import "firebase/compat/database";
import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import { AiFillDelete, AiFillSave } from "react-icons/ai";

export default function Dashboard() {
    const isUserLoggedIn = isLoggedIn();
    const [passwords, setPasswords] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [decryptedPasswords, setDecryptedPasswords] = useState([]);

    useEffect(() => {
        if (!isUserLoggedIn) {
            window.location.href = "/";
            return null;
        }

        firebase.initializeApp(firebaseConfig);

        const database = firebase
            .database()
            .ref("users")
            .child(localStorage.getItem("user"))
            .child("passwords");

        database.on("value", (snapshot) => {
            const data = snapshot.val();
            const passwords = [];

            for (let id in data) {
                if (data[id].encryptionType === "Simple-columnar") {
                    const data1 = { ciphertext: data[id].password }
                    fetch("http://localhost:5000/simplecolumnardecrypt", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data1),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            decryptedPasswords.push(data.plaintext);
                        });
                }
                else if (data[id].encryptionType === "Multiple-columnar") {
                    const data1 = { ciphertext: data[id].password }
                    fetch("http://localhost:5000/multiplecolumnardecrypt", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data1),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            decryptedPasswords.push(data.plaintext);
                        });
                }
                else if (data[id].encryptionType === "Rail-fence") {
                    const data1 = { cipher: data[id].password }
                    fetch("http://localhost:5000/railfencedecrypt", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data1),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            decryptedPasswords.push(data.plaintext);
                        });
                } else {
                    decryptedPasswords.push(data[id].password);
                }

                passwords.push({
                    id,
                    ...data[id],
                });
            }
            console.log(decryptedPasswords);
            setPasswords(passwords);
        });

        return () => {
            database.off();
        };
    }, [isUserLoggedIn]);

    // filter function to check if a password matches the search query based on the website or username
    const matchesSearchQuery = (password) => {
        const website = password.website.toLowerCase();
        const username = password.username.toLowerCase();
        const query = searchQuery.toLowerCase();
        return website.includes(query) || username.includes(query);
    };

    // filter the passwords based on the search query
    const filteredPasswords = passwords.filter(matchesSearchQuery);

    return (
        <div className="container my-4 px-5 py-4 rounded shadow bg-body-tertiary">
            <div className="d-flex mb-3 justify-content-between align-items-center">
                <h2 className="mb-4 col">Passwords</h2>
                <form
                    className="d-flex mx-2"
                    role="search"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
                <Link to="/addpassword">
                    <button className="btn btn-primary">Add Password</button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered text-center table-hover">
                    <thead>
                        <tr>
                            <th style={{ width: "7%" }}>Sr. No.</th>
                            <th>Website</th>
                            <th>Username</th>
                            <th>Encrypted Password</th>
                            <th>Encryption Type</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPasswords.map((password, index) => (
                            <tr key={index}>
                                <td className="align-middle text-center">
                                    {index + 1}
                                </td>
                                <td className="align-middle text-center">
                                    {password.website}
                                </td>
                                <td className="align-middle text-center">
                                    {password.username}
                                </td>
                                <td className="align-middle text-center">
                                    <div className="input-group my-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                              showPassword ||
                                              password.id !== selectedPassword
                                                    ? password.password
                                                    : decryptedPasswords[index]
                                            }
                                            disabled={
                                                !isUpdating ||
                                                password.id !== selectedPassword
                                            }
                                            onChange={(e) => {
                                                const database = firebase
                                                    .database()
                                                    .ref("users")
                                                    .child(
                                                        localStorage.getItem(
                                                            "user"
                                                        )
                                                    )
                                                    .child("passwords");
                                                database
                                                    .child(password.id)
                                                    .update({
                                                        password:
                                                            e.target.value,
                                                    });
                                            }}
                                        />
                                        <button
                                            className="btn btn-secondary"
                                            type="button"
                                            id="button-encrypt-decrypt"
                                            onClick={(e) => {
                                                setSelectedPassword(
                                                    password.id
                                                );
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            {showPassword ||
                                            password.id !== selectedPassword ? (
                                                <BsFillLockFill />
                                            ) : (
                                                <BsFillUnlockFill />
                                            )}
                                        </button>
                                    </div>
                                </td>
                                <td className="align-middle text-center">
                                    {password.encryptionType}
                                </td>
                                <td className="align-middle text-center">
                                    {password.lastUpdated}
                                </td>
                                <td className="align-middle text-center">
                                    {!isUpdating ||
                                    password.id !== selectedPassword ? (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                setIsUpdating(true);
                                                setSelectedPassword(
                                                    password.id
                                                );
                                            }}
                                        >
                                            <FiUpload />
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => {
                                                setIsUpdating(false);
                                                setSelectedPassword(null);
                                            }}
                                        >
                                            <AiFillSave />
                                        </button>
                                    )}

                                    <button
                                        className="btn btn-danger ms-2 btn-sm"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const isConfirmed = window.confirm(
                                                "Are you sure you want to delete this password?"
                                            );
                                            if (!isConfirmed) return;
                                            const database = firebase
                                                .database()
                                                .ref("users")
                                                .child(
                                                    localStorage.getItem("user")
                                                )
                                                .child("passwords");
                                            database
                                                .child(password.id)
                                                .remove();
                                        }}
                                    >
                                        <AiFillDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
