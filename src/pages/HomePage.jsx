import React from "react";

function HomePage() {
  return (
    <div className="header">
      <div className="header-info">
        <h1>Welcome to Cute Not Cringe Animal Art Gallery </h1>
        <p>
          A place where you can share painted images of your favourite animals
        </p>
        <button className="button">
          <a href="/gallery">Go down the rabbit hole</a>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
