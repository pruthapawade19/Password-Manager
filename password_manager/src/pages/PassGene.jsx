import React, { useEffect, useState } from "react";
import isLoggedIn from "../components/isLoggedIn";

export default function PassGene() {
  useEffect(() => {
    const isUserLoggedIn = isLoggedIn();

    if (!isUserLoggedIn) {
      window.location.href = "/";
    }
  }, []);

  const [passLength, setPassLength] = useState(0);
  const [charSet, setCharSet] = useState(0);
  const [excludeChar, setExcludeChar] = useState("");
  const [includeChar, setIncludeChar] = useState("");
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [generatedPass, setGeneratedPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Character sets
    const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Selected character set
    let selectedCharSet;
    if (charSet === "1") {
      selectedCharSet = alphabets;
    } else if (charSet === "2") {
      selectedCharSet = alphabets + numbers;
    } else if (charSet === "3") {
      selectedCharSet = alphabets + numbers + specialChars;
    }

    // Excluded characters
    const excludedChars = excludeChar.split("");

    // Included characters
    const includedChars = includeChar.split("");

    // Combine character sets and remove excluded characters
    let availableChars = selectedCharSet.split("");
    excludedChars.forEach((char) => {
      availableChars = availableChars.filter((c) => c !== char);
    });

    // Add included characters
    includedChars.forEach((char) => {
      if (!availableChars.includes(char)) {
        availableChars.push(char);
      }
    });

    // Generate password
    let password = "";
    let isAllIncludedCharsPresent = false;
    while (!isAllIncludedCharsPresent) {
      for (let i = 0; i < passLength; i++) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        password += availableChars[randomIndex];
      }
      isAllIncludedCharsPresent = true;
      includedChars.forEach((char) => {
        if (!password.includes(char)) {
          isAllIncludedCharsPresent = false;
        }
      });
      if (!isAllIncludedCharsPresent) {
        password = "";
      }
    }

    // Update state
    setGeneratedPass(password);
    setIsPassGenerated(true);
  };

  return (
    <div className="container mx-auto w-75 shadow rounded my-4 p-4 px-5 bg-body-tertiary">
      <h2 className="text-center mb-4">Password Generator</h2>
      <form className="row" onSubmit={handleSubmit}>
        <div className="mb-3 col-lg-6 col-md-12">
          <label htmlFor="pass-length" className="form-label">
            Enter Password Length
          </label>
          <input
            type="number"
            className="form-control"
            id="pass-length"
            value={passLength}
            onChange={(e) => setPassLength(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 col-lg-6 col-md-12">
          <label htmlFor="char-set" className="form-label">
            Select Character Set
          </label>
          <select
            className="form-select"
            id="char-set"
            required
            value={charSet}
            onChange={(e) => setCharSet(e.target.value)}
          >
            <option value="">Select Character Set</option>
            <option value="1">Alphabets</option>
            <option value="2">Alphabets + Numbers</option>
            <option value="3">Alphabets + Numbers + Special Characters</option>
          </select>
        </div>
        <div className="mb-3 col-lg-6 col-md-12">
          <label htmlFor="exclude-char" className="form-label">
            Exclude Characters
          </label>
          <input
            type="text"
            value={excludeChar}
            onChange={(e) => setExcludeChar(e.target.value)}
            className="form-control"
            id="exclude-char"
            placeholder="Enter characters to exclude"
          />
          <div id="exclude-char-help" className="form-text">
            For example: "acb" will exclude a, c and b from the generated
          </div>
        </div>
        <div className="mb-3 col-lg-6 col-md-12">
          <label htmlFor="include-char" className="form-label">
            Include Characters
          </label>
          <input
            type="text"
            value={includeChar}
            onChange={(e) => setIncludeChar(e.target.value)}
            className="form-control"
            id="include-char"
            placeholder="Enter characters to include"
          />
          <div id="include-char-help" className="form-text">
            For example: "acb" will include a, c and b in the generated
          </div>
        </div>
        {isPassGenerated ? (
          <div className="mb-3 col-12">
            <label htmlFor="generated-pass" className="form-label">
              Generated Password
            </label>
            <div className="input-group">
              <input
                type="text"
                value={generatedPass}
                className="form-control"
                id="generated-pass"
                readOnly
                disabled
              />
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={(e) => {
                  navigator.clipboard.writeText(generatedPass);
                  e.target.innerText = "Copied";
                  e.target.classList.remove("btn-outline-primary");
                  e.target.classList.add("btn-secondary");
                  // timeout to revert back to original state
                  setTimeout(() => {
                    e.target.innerText = "Copy";
                    e.target.classList.remove("btn-secondary");
                    e.target.classList.add("btn-outline-primary");
                  }, 2000);
                }}
              >
                Copy
              </button>
            </div>
          </div>
        ) : null}

        <div className="mb-3 col-12 text-end">
          <button type="submit" className="btn btn-success">
            Generate Password
          </button>
        </div>
      </form>
    </div>
  );
}
