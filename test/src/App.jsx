// src/App.jsx
import React, { useEffect } from 'react';
import './main.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faCaretDown } from '@fortawesome/free-solid-svg-icons';

function App() {
  const showMenu = () => {
    document.getElementById("navLinks").style.right = "0";
  };

  const hideMenu = () => {
    document.getElementById("navLinks").style.right = "-200px";
  };

  const myDropDown = (element) => {
    const dropdown = document.getElementById("myDropDown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  };

  return (
    <div>
      <section id="top" className="header">
        <nav>
          <div className="nav-links" id="navLinks" style={{ right: "-200px" }}>
            <FontAwesomeIcon icon={faTimes} onClick={hideMenu} />
            <ul>
              <li><a href="#home">Home</a></li>
              <div className="dropdown">
                <a className="dropdown-btn" onClick={() => myDropDown(this)}>Art Classifications
                  <FontAwesomeIcon icon={faCaretDown} />
                </a>
                <div id="myDropDown" className="dropdown-content" style={{ display: "none" }}>
                  <li><a href="#painting">Interior Designs</a></li>
                  <li><a href="#sculpture">Environmental Art</a></li>
                  <li><a href="#photography">Donuts!</a></li>
                  <li><a href="#miscellaneous">Miscellaneous</a></li>
                </div>
              </div>
              <li><a href="#program">Timeline</a></li>
            </ul>
          </div>
          <FontAwesomeIcon icon={faBars} onClick={showMenu} />
        </nav>

        <div className="text-box">
          <h1>Chill's 3d Art Gallery</h1>
          <p>
            Welcome to Chill's Museum, where you will witness the creativity Chill has
            made. <br /> Browse further to witness each 3d art he has created.
          </p>
          <a href="class.html" className="hero-btn">Click Here</a>
        </div>
      </section>
    </div>
  );
}

export default App;
