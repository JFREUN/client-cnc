import React from 'react';
import hamburger from "../images/menu_FILL0_wght400_GRAD0_opsz48.png";
import { Link } from "react-router-dom";

function Hamburger({toggleNav}) {
  return (
    <div className="hamburger">
     <Link onClick={toggleNav}><img  src={hamburger} alt="hamburger-menu" /></Link> 
    </div>
  )
}

export default Hamburger