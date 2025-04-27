import React, { useState, useEffect, useRef } from 'react';
import './main.css';

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
  const [isClosingZoom, setIsClosingZoom] = useState(false);
  const [fadeKey, setFadeKey] = useState(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const headerRef = useRef(null);
  const refreshButtonRef = useRef(null);
  const imagesToLoadRef = useRef(0);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("blurred");
      } else {
        document.body.classList.remove("blurred");
      }
      return next;
    });
  };

  const handleNavClick = (sectionId) => {
    if (activeSection === sectionId) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setActiveSection(sectionId);
      setFadeKey((prev) => prev + 1);
      setMenuOpen(false);
      setImagesLoaded(false);

      setTimeout(() => {
        const refreshBtn = document.querySelector(".refresh-button");
        if (refreshBtn) refreshBtn.blur();
      }, 250);
    }, 250);
  };

  const handleVideoClick = (src) => {
    setZoomedVideo(src);
  };

  const handleImageClick = (src) => {
    setZoomedImage(src);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      if (refreshButtonRef.current) {
        refreshButtonRef.current.blur();
      }

      setActiveSection(null);
      setZoomedImage(null);
      setZoomedVideo(null);
      setFadeKey((prev) => prev + 1);
      setImagesLoaded(true);

      if (headerRef.current) {
        headerRef.current.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => {
        setIsRefreshing(false);
      }, 200);
    }, 200);
  };

  const closeZoom = () => {
    setIsClosingZoom(true);

    setTimeout(() => {
      setZoomedImage(null);
      setZoomedVideo(null);
      setIsClosingZoom(false);
    }, 300);
  };

  const handleImageLoad = () => {
    imagesToLoadRef.current -= 1;
    if (imagesToLoadRef.current <= 0) {
      setImagesLoaded(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document
        .querySelectorAll(".image-container, .belowimage-container")
        .forEach((row) => {
          if (row.children.length === 1) {
            row.classList.add("single");
          } else {
            row.classList.remove("single");
          }
        });
    }, 100);

    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeSection) {
      const images = document.querySelectorAll(`#${activeSection} img`);
      const videos = document.querySelectorAll(`#${activeSection} video`);
      imagesToLoadRef.current = images.length + videos.length;

      if (imagesToLoadRef.current === 0) {
        setImagesLoaded(true);
      }
    }
  }, [activeSection]);

  useEffect(() => {
    if (imagesLoaded) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const hamburgerButton = document.querySelector(".hamburger");
    const menu = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links ul li button");

    const toggleMenu = () => {
      menu.classList.toggle("show");
      const refreshButton = document.querySelector(".refresh-button");
      const blurOverlay = document.querySelector(".blur-overlay");

      if (refreshButton) {
        if (menu.classList.contains("show")) {
          refreshButton.classList.add("menu-open");
          blurOverlay?.classList.add("show");
        } else {
          refreshButton.classList.remove("menu-open");
          blurOverlay?.classList.remove("show");
        }
      }
    };

    const closeMenu = () => {
      menu.classList.remove("show");
      hamburgerButton.classList.remove("active");
      document.activeElement.blur();

      const refreshButton = document.querySelector(".refresh-button");
      const blurOverlay = document.querySelector(".blur-overlay");

      if (refreshButton) {
        refreshButton.classList.remove("menu-open");
      }

      if (blurOverlay) {
        blurOverlay.classList.remove(".show");
      }
    };

    const handleClickOutside = (event) => {
      if (menu && !menu.contains(event.target) && !hamburgerButton.contains(event.target)) {
        closeMenu();
      }
    };

    if (hamburgerButton && menu) {
      hamburgerButton.addEventListener("click", toggleMenu);
      document.addEventListener("click", handleClickOutside);
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    return () => {
      if (hamburgerButton) {
        hamburgerButton.removeEventListener("click", toggleMenu);
      }
      navLinks.forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const hamburgerButton = document.querySelector(".hamburger");

    const handleScroll = () => {
      hamburgerButton.style.transform = "translateY(0)";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("blurred");
    } else {
      document.body.classList.remove("blurred");
    }

    return () => {
      document.body.classList.remove("blurred");
    };
  }, [menuOpen]);

  const handleGenreClick = () => {
    setMenuOpen(false);
    document.body.classList.remove("blurred");
  };

  return (
    <div>
      {/* Title and Description Section */}
      <section className="header" ref={headerRef}>
        <div className="intro-text">
          <h1>Chill's 3D Art Gallery</h1>
          <p>
            Welcome to Chill's Museum, where you will witness the creativity Chill has
            made. <br /> Browse further to witness each 3D art he has created.
          </p>
        </div>

        {/* Navigation Section */}
        <nav>
          <button className="hamburger" onClick={toggleMenu}>
            &#9776;
          </button>

          <div className="blur-overlay"></div> 

          <div className={`click-blocker ${menuOpen ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}></div>

          <div className={`nav-links ${menuOpen ? 'show' : ''}`} id="navLinks">
            <ul>
              <li>
                <button
                  className={`button ${activeSection === "interior" ? "button active disabled" : ""}`}
                  onClick={() => {
                    if (activeSection !== "interior") {
                      handleNavClick("interior");
                    }
                    handleGenreClick();
                  }}
                  disabled={activeSection === "interior"}
                >
                  Interior Designs
                </button>
              </li>
              <li>
                <button
                  className={`button ${activeSection === "environment" ? "button active disabled" : "button"}`}
                  onClick={() => {
                    if (activeSection !== "environment") {
                      handleNavClick("environment");
                    }
                    handleGenreClick();
                  }}
                  disabled={activeSection === "environment"}
                >
                  Environmental Art
                </button>
              </li>
              <li>
                <button
                  className={`button ${activeSection === "donuts" ? "button active disabled" : "button"}`}
                  onClick={() => {
                    if (activeSection !== "donuts") {
                      handleNavClick("donuts");
                    }
                    handleGenreClick();
                  }}
                  disabled={activeSection === "donuts"}
                >
                  Donuts!
                </button>
              </li>
              <li>
                <button
                  className={`button ${activeSection === "miscellaneous" ? "button active disabled" : "button"}`}
                  onClick={() => {
                    if (activeSection !== "miscellaneous") {
                      handleNavClick("miscellaneous");
                    }
                    handleGenreClick();
                  }}
                  disabled={activeSection === "miscellaneous"}
                >
                  Miscellaneous
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </section>

      {!activeSection && (
        <div key={fadeKey}
          id="default-heading"
          className={`default-heading
        ${isRefreshing ? 'fade-outwebsite' : 'fade-inwebsite'}`}>
          <h2>Select a category above to view Chill's 3D creations!</h2>
          <p>Interior, environments, donuts, or just some fun renders — take your pick!</p>
        </div>
      )}

      {/* Art and Display Section */}
      {activeSection === "interior" && (
        <div key={fadeKey}
          id="interior"
          className={`art-section genre-title 
        ${imagesLoaded ? 'fade-ingenres' : ''}
        ${isRefreshing ? 'fade-out' : 'fade-ingenres'}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            }, 100);
          }}
        >
          <div className={`fade-wrapper ${imagesLoaded ? 'fade-in' : ''}`}>
            <h2>Interior Designs</h2>
            <div className="image-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img
                  className="interior-image1"
                  src={renderImage1}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage1)}
                />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image2"
                  src={renderImage3}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage3)}
                />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image3"
                  src={renderImage4}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage4)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image4"
                  src={renderImage9}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage9)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image5"
                  src={renderImage13}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage13)} />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image6"
                  src={renderImage22}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video12)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "environment" && (
        <div key={fadeKey}
          id="environment"
          className={`art-section genre-title 
        ${imagesLoaded ? 'fade-ingenres' : ''}
        ${isRefreshing ? 'fade-out' : 'fade-ingenres'}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            }, 100);
          }}
        >
          <div className={`fade-wrapper ${imagesLoaded ? 'fade-in' : ''}`}>
            <h2>Environment Art</h2>
            <div className="image-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image1"
                  src={renderImage5}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video2)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image2"
                  src={renderImage6}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage6)} />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image3"
                  src={renderImage7}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage7)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image4"
                  src={renderImage11}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage11)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image5"
                  src={renderImage12}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video5)} />
              </div>
            </div>

            <div className="belowimage-container2">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image6"
                  src={renderImage15}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video6)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image7"
                  src={renderImage18}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage18)} />
              </div>
            </div>

            <div className="belowimage-container3">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image8"
                  src={renderImage19}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video9)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "donuts" && (
        <div key={fadeKey}
          id="donuts"
          className={`art-section genre-title 
        ${imagesLoaded ? 'fade-ingenres' : ''}
        ${isRefreshing ? 'fade-out' : 'fade-ingenres'}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            }, 100);
          }}
        >
          <div className={`fade-wrapper ${imagesLoaded ? 'fade-in' : ''}`}>
            <h2>Donuts!</h2>
            <div className="image-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="donut-image1"
                  src={renderImage2}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video1)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="donut-image3"
                  src={renderImage20}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video10)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="donut-image2"
                  src={renderImage10}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video4)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "miscellaneous" && (
        <div key={fadeKey}
          id="miscellaneous"
          className={`art-section genre-title 
        ${imagesLoaded ? 'fade-ingenres' : ''}
        ${isRefreshing ? 'fade-out' : 'fade-ingenres'}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}>

          <div className={`fade-wrapper ${imagesLoaded ? 'fade-in' : ''}`}>
            <h2>Miscellaneous</h2>
            <div className="image-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image1"
                  src={renderImage8}
                  alt="Misc 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video3)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image2"
                  src={renderImage14}
                  alt="Misc 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage14)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image3"
                  src={renderImage16}
                  alt="Misc 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video7)} />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image4"
                  src={renderImage17}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video8)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image6"
                  src={renderImage23}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleImageClick(renderImage23)} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image5"
                  src={renderImage21}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={() => handleVideoClick(video11)} />
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className={`back-to-top ${showTopButton ? '' : 'back-to-top-hidden'}`}
        onClick={() => {
          document.querySelector('.header').scrollIntoView({ behavior: 'smooth' });
        }}
      >
        ⬆ Back to Top
      </button>

      {activeSection && (
        <button
          ref={refreshButtonRef}
          className={`refresh-button ${menuOpen ? 'menu-open' : ''}`}
          tabIndex={menuOpen ? -1 : 0}
          onClick={handleRefresh}>

          Refresh
        </button>
      )}

      {zoomedImage && (
        <div className="zoom-overlay" onClick={closeZoom}>
          <img
            src={zoomedImage}
            alt="Zoomed"
            className={`zoomed-image ${isClosingZoom ? 'fade-out' : ''}`}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="close-button" onClick={closeZoom}>×</span>
        </div>
      )}


      {zoomedVideo && (
        <div className="zoom-overlay" onClick={closeZoom}>
          <video
            src={zoomedVideo}
            className={`zoomed-video ${isClosingZoom ? 'fade-out' : ''}`}
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