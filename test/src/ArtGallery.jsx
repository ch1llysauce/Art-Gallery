import React, { useState, useEffect } from 'react';
import './main.css'; // Import the CSS file

import renderImage1 from './1st Render/blenderrender.png';

import video1 from './2nd/0001 60 fps.mp4';
import renderImage2 from './2nd/donut.png';
import renderImage3 from './3rd/interior2.jpg';
import renderImage4 from './4th/interior2.jpg';

import renderImage5 from './5th/0270.png';
import video2 from "./5th/final iceberg w mountain 1080 60.mp4"
import renderImage6 from './6th_other planet/1/1_00000.png';
import renderImage7 from './7th_Aurora/final_aurora.png';

import renderImage8 from './8th_Earth/1800.png';
import video3 from './8th_Earth/planet earth orig.mp4';

import renderImage9 from './9th_toilet/official render.png';

import renderImage10 from './10th_2nd donut/finaldonut.png';
import video4 from './10th_2nd donut/final render.mp4';

import renderImage11 from './11th_runic/official portal render.png';

import renderImage12 from './12th/0420.png';
import video5 from './12th/official forest render.mp4';

import renderImage13 from './13th_int/official render.png';
import renderImage14 from './14th_cubes/official render.png';

import renderImage15 from './15th/0807.png';
import video6 from './15th/official render.mp4';

import renderImage16 from './16th/0051.png';
import video7 from './16th/black hole.mp4';

import renderImage17 from './17th/1250.png';
import video8 from './17th/sci-fi tube.mp4';

import renderImage18 from './18th_paradise/official render.png';

import renderImage19 from './19th/untitled.png';
import video9 from './19th/iceberg official render.mp4';

import renderImage20 from './20th/0160.png';
import video10 from './20th/donut 2023.mp4';

import renderImage21 from './21st/0001.png';
import video11 from './21st/OFFICIAL RENDER.mp4';

import renderImage22 from './22nd/comparison.png';
import video12 from './22nd/video.mp4';

import renderImage23 from './23rd_phone/lockscreen.png';

function App() {

  const [activeSection, setActiveSection] = useState(null);

  const [zoomedImage, setZoomedImage] = useState(null);

  const [zoomedVideo, setZoomedVideo] = useState(null);

  const [fadeKey, setFadeKey] = useState(0);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setFadeKey(prev => prev + 1);
  };

  const handleVideoClick = (src) => {
    setZoomedVideo(src);
  };
  const handleImageClick = (src) => {
    setZoomedImage(src);
  };

  const closeZoom = () => {
    setZoomedImage(null);
    setZoomedVideo(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.image-container, .belowimage-container').forEach((row) => {
        if (row.children.length === 1) {
          row.classList.add('single');
        } else {
          row.classList.remove('single');
        }
      });
    }, 100); // Delay to ensure rendering

    return () => clearTimeout(timer); // Cleanup the timeout
  }, [activeSection]);

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

      {!activeSection && (
        <div className="default-heading">
          <h2>Select a category above to view Chill's 3D creations!</h2>
          <p>Interior, environments, donuts, or just some fun renders — take your pick!</p>
        </div>
      )}

      {/* Art and Display Section */}
      {activeSection === "interior" && (
        <div key={fadeKey} id="interior" className={`art-section genre-title fade-in`}>
          <h2>Interior Designs</h2>
          <div className="image-container">
            <div>
              <img
                className="interior-image1"
                src={renderImage1}
                alt="Blender Render"
                onClick={() => handleImageClick(renderImage1)}
              />
            </div>

            <div>
              <img className="interior-image2"
                src={renderImage3}
                alt="Blender Render"
                onClick={() => handleImageClick(renderImage3)}
              />
            </div>
          </div>

          <div className="belowimage-container">
            <div>
              <img className="interior-image3"
                src={renderImage4}
                alt="Blender Render"
                onClick={() => handleImageClick(renderImage4)} />
            </div>

            <div>
              <img className="interior-image4"
                src={renderImage9}
                alt="Blender Render"
                onClick={() => handleImageClick(renderImage9)} />
            </div>

            <div>
              <img className="interior-image5"
                src={renderImage13}
                alt="Blender Render"
                onClick={() => handleImageClick(renderImage13)} />
            </div>
          </div>

          <div className="belowimage-container">
            <div>
              <img className="interior-image6"
                src={renderImage22}
                alt="Blender Render"
                onClick={() => handleVideoClick(video12)}
                style={{ width: '80%' }} />
            </div>
          </div>
        </div>
      )}

      {activeSection === "environment" && (
        <div key={fadeKey} id="environment" className={`art-section genre-title fade-in`}>
          <h2>Environment Art</h2>
          <div className="image-container">
            <div>
              <img className="environment-image1"
                src={renderImage5}
                alt="Environmental Design 1"
                onClick={() => handleVideoClick(video2)} />
            </div>

            <div>
              <img className="environment-image2" 
              src={renderImage6} 
              alt="Environmental Design 1" 
              onClick={() => handleImageClick(renderImage6)} />
            </div>
          </div>

          <div className="belowimage-container">
            <div>
              <img className="environment-image3" 
              src={renderImage7} 
              alt="Environmental Design 1" 
              onClick={() => handleImageClick(renderImage7)}/>
            </div>

            <div>
              <img className="environment-image4" 
              src={renderImage11} 
              alt="Environmental Design 1" 
              onClick={() => handleImageClick(renderImage11)}/>
            </div>

            <div>
              <img className="environment-image5" 
              src={renderImage12} 
              alt="Environmental Design 1" 
              onClick={() => handleVideoClick(video5)}/>
            </div>
          </div>

          <div className="belowimage-container2">
            <div>
              <img className="environment-image6" 
              src={renderImage15} 
              alt="Environmental Design 1" 
              onClick={() => handleVideoClick(video6)}/>
            </div>

            <div>
              <img className="environment-image7" 
              src={renderImage18} 
              alt="Environmental Design 1" 
              onClick={() => handleImageClick(renderImage18)}/>
            </div>
          </div>

          <div className="belowimage-container3">
            <div>
              <img className="environment-image8" 
              src={renderImage19} 
              alt="Environmental Design 1" 
              onClick={() => handleVideoClick(video9)}
              style={{ width: '80%' }} />
            </div>
          </div>
        </div>
      )}

      {activeSection === "donuts" && (
        <div key={fadeKey} id="donuts" className={`art-section genre-title fade-in`}>
          <h2>Donuts!</h2>
          <div className="image-container">
            <div>
              <img className="donut-image1" 
              src={renderImage2}
              alt="Environmental Design 1"
              onClick={() => handleVideoClick(video1)} />
            </div>

            <div>
              <img className="donut-image3" 
              src={renderImage20} 
              alt="Blender Render" 
              onClick={() => handleVideoClick(video10)}/>
            </div>

            <div>
              <img className="donut-image2" 
              src={renderImage10} 
              alt="Blender Render" 
              onClick={() => handleVideoClick(video4)}/>
            </div>
          </div>
        </div>
      )}

      {activeSection === "miscellaneous" && (
        <div key={fadeKey} id="miscellaneous" className={`art-section genre-title fade-in`}>
          <h2>Miscellaneous</h2>
          <div className="image-container">
            <div>
              <img className="misc-image1" 
              src={renderImage8} 
              alt="Misc 1" 
              onClick={() => handleVideoClick(video3)}/>
            </div>

            <div>
              <img className="misc-image2" 
              src={renderImage14} 
              alt="Misc 1"
              onClick = {() => handleImageClick(renderImage14)} />
            </div>

            <div>
              <img className="misc-image3" 
              src={renderImage16} 
              alt="Misc 1" 
              onClick = {() => handleVideoClick(video7)} />
            </div>
          </div>

          <div className="belowimage-container">
            <div>
              <img className="misc-image4" 
              src={renderImage17} 
              alt="Environmental Design 1" 
              onClick = {() => handleVideoClick(video8)} />
            </div>

            <div>
              <img className="misc-image6" 
              src={renderImage23} 
              alt="Environmental Design 1" 
              onClick={() => handleImageClick(renderImage23)}/>
            </div>

            <div>
              <img className="misc-image5" 
              src={renderImage21} 
              alt="Environmental Design 1" 
              onClick={() => handleVideoClick(video11)}/>
            </div>
          </div>
        </div>
      )}

      {zoomedImage && (
        <div className="zoom-overlay" onClick={closeZoom}>
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="zoomed-image"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="close-button" onClick={closeZoom}>×</span>
        </div>
      )}


      {zoomedVideo && (
        <div className="zoom-overlay" onClick={closeZoom}>
          <video
            src={zoomedVideo}
            className="zoomed-video"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
          <span className="close-button" onClick={closeZoom}>×</span>
        </div>
      )}


    </div>
  );
}


export default App;