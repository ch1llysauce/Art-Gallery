import React, { useState } from 'react';
import './main.css'; // Import the CSS file
import renderImage1 from './1st Render/blenderrender.png';
import renderImage2 from './2nd/donut.png';
import renderImage3 from './3rd/interior2.jpg';
import renderImage4 from './4th/interior2.jpg';

function App() {
  const [activeSection, setActiveSection] = useState(null);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div>
      {/* Title and Description Section */}
      <section className="header">
        <div className="intro-text">
          <h1>Chill's 3D Art Gallery</h1>
          <p>
            Welcome to Chill's Museum, where you will witness the creativity Chill has
            made. <br /> Browse further to witness each 3D art he has created.
          </p>
        </div>

        {/* Navigation Section */}
        <nav>
          <div className="nav-links" id="navLinks" style={{ right: "-200px" }}>
            <ul>
              <li><button
                className={activeSection === "interior" ? "button active" : "button"}
                onClick={() => handleNavClick("interior")}
              >
                Interior Designs
              </button></li>
              <li><button
                className={activeSection === "environment" ? "button active" : "button"}
                onClick={() => handleNavClick("environment")}
              >
                Environmental Art
              </button></li>
              <li><button
                className={activeSection === "donuts" ? "button active" : "button"}
                onClick={() => handleNavClick("donuts")}
              >
                Donuts!
              </button></li>
              <li><button
                className={activeSection === "miscellaneous" ? "button active" : "button"}
                onClick={() => handleNavClick("miscellaneous")}
              >
                Miscellaneous
              </button></li>
            </ul>
          </div>
        </nav>
      </section>

      {/* Art and Display Section */}
      {activeSection === "interior" && (
        <div id="interior" className="art-section genre-title">
          <h2>Interior Designs</h2>
          <div className="image-container">
          <a href="https://www.google.com">
            <img className="interior-image1" src={renderImage1} alt = "Blender Render"/>
          </a>

          <a href="https://www.google.com">
            <img className="interior-image2" src={renderImage3} alt = "Blender Render"/>
          </a>
          </div>

          <div className = "belowimage-container">
          <a href="https://www.google.com">
            <img className="interior-image3" src={renderImage4} alt = "Blender Render"/>
          </a>

          </div>
        </div>
      )}

      {activeSection === "environment" && (
        <div id="environment" className="art-section genre-title">
          <h2>Environment Art</h2>
          <img src="environment-design1.jpg" alt="Environmental Design 1" />
        </div>
      )}

      {activeSection === "donuts" && (
        <div id="donuts" className="art-section genre-title">
          <h2>Donuts!</h2>
          <a href="https://www.google.com">
            <img src={renderImage2} alt = "Blender Render"/>
          </a>
        </div>
      )}

      {activeSection === "miscellaneous" && (
        <div id="miscellaneous" className="art-section genre-title">
          <h2>Miscellaneous</h2>
          <img src="miscellaneous-design1.jpg" alt="Miscellaneous Design 1" />
        </div>
      )}
    </div>
  );
}

export default App;