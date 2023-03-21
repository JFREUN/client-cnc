import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <nav className="nav-bar">
        <div className="nav-bar-div" id="nav-bar-div">
          <ul>
            <li>
              <a href="/">
                <img
                  src="/images/cute-not-cringe-logo.png"
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
                  <a href="/profile">Profile</a>
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
      </nav>
    </div>
  );
}

export default Navbar;
