import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <div className="welcome">
        <div className="welcome-content container">
          <div className="houses-logo">
            <img src="../../../src/Assets/Houses/Al-Adiyat.png" alt="" />
          </div>
          <div className="texts">
            <h1 className="text-light heading-text">
              <span className="elegant-text">Darsa Houses</span> <br />
              Dashboard
            </h1>
            <p className="text-light body-text">
              Monitor scores, announcements, houses events here!
            </p>
            <div className="welcome-btn">
              <button className="btn btn-primary btn-darsa-solid-blue">
                Current Podium
              </button>
              <button className="btn btn-darsa-blank-yellow">
                Houses Details {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
