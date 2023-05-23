import React from 'react';
import { useContext,useState } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../images/Animal Art Co..png"


function DesktopNav() {
    const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <div className="nav-bar-div" id="nav-bar-div">
          <ul>
            <li>
              <a href="/">
                <img
                  src={logo}
                  alt="logo"
                  id="logo"
                />
              </a>
            </li>
            <li className="li-no-logo">
              <a href="/">Home</a>
            </li>
            <li className="li-no-logo">
              <a href="/gallery">Gallery</a>
            </li>
            {isLoggedIn && (
              <>
                <li className="li-no-logo">
                  {user && <a href={`/profile/${user._id}`}>Profile</a>}
                </li>
                <li className="li-no-logo">
                
                    <button type="submit" className="logout-button" onClick={logOutUser}>
                      Logout
                    </button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="li-no-logo">
                  <a href="/signup">Sign Up</a>
                </li>
                <li className="li-no-logo">
                  <a href="/login">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
  )
}

export default DesktopNav