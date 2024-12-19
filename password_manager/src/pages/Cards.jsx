import React from 'react'
import isLoggedIn from "../components/isLoggedIn";


export default function Cards() {
  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    window.location.href = "/";
    return null;
  }
  return (
    <div>
      <h1>Cards Page</h1>
    </div>
  )
}
