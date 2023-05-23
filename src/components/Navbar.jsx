import React from "react";
import { useState } from "react";
import Hamburger from "./Hamburger";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

function Navbar() {
  const [mobile, setMobile] = useState(false)

  const toggleNav = () => {
    setMobile(!mobile)
  }

  return (
    <div>
      <nav className="nav-bar">
        <DesktopNav/>
        <Hamburger toggleNav={toggleNav}/>
      </nav>
      {mobile && <MobileNav/>}
    </div>
  );
}

export default Navbar;
