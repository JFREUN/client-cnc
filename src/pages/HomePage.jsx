import React from "react";
import background from "../images/Large_pinksheepfull.jpeg";

function HomePage() {
  return (
    <div className="header">
      <div className="header-info">
        <h1>Welcome to Your Animal Art Gallery </h1>
        <p>
          A place where you can share painted images of your favourite animals
        </p>
        <button className="button">
          <a href="/gallery">Go down the rabbit hole</a>
        </button>
      </div>
      <div className="header-img">
      <img src={background} alt="sheep" />
      </div>
    </div>
  );
}

export default HomePage;
