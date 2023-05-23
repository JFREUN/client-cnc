import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import home from "../images/cottage_FILL0_wght400_GRAD0_opsz48.png";
import profile from "../images/account_circle_FILL0_wght400_GRAD0_opsz48.png";
import gallery from "../images/photo_FILL0_wght400_GRAD0_opsz48.png";
import logout from "../images/logout_FILL0_wght400_GRAD0_opsz48.png";
import login from "../images/login_FILL0_wght400_GRAD0_opsz48.png";
import signup from "../images/add_box_FILL0_wght400_GRAD0_opsz48.png";

function MobileNav() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <div className="mobileNav">
      <ul>
        <li>
          <img src={home} alt="home" className="navIcon" />
          <a href="/">Home</a>
        </li>
        <li>
          <img src={gallery} alt="gallery" className="navIcon" />
          <a href="/gallery">Gallery</a>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <img src={profile} alt="profile" className="navIcon" />
              {user && <a href={`/profile/${user._id}`}>Profile</a>}
            </li>
            <li>
              <img src={logout} alt="logout" className="navIcon" />
              <button className="logout-button" onClick={logOutUser}>
                Logout
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <img src={signup} alt="signup" className="navIcon" />
              <a href="/signup">Sign Up</a>
            </li>
            <li>
              <img src={login} alt="login" className="navIcon" />
              <a href="/login">Login</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default MobileNav;
