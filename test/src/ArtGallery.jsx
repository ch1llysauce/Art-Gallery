import React, { useState, useEffect, useRef } from 'react';
import './main.css';

import blenderlogo from './logos/Blender_logo_no_text.svg.png';
import aftereffectslogo from './logos/after-effects-40.png';
import premierelogo from './logos/premiere-pro-40.png';

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

const ArtGallery = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomedVideo, setZoomedVideo] = useState(null);
  const [isClosingZoom, setIsClosingZoom] = useState(false);
  const [fadeKey, setFadeKey] = useState(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
  const headerRef = useRef(null);
  const refreshButtonRef = useRef(null);
  const imagesToLoadRef = useRef(0);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleNavClick = (sectionId) => {
    if (activeSection === sectionId) return;

    if (activeSection !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setTimeout(() => {
      setActiveSection(sectionId);
      setFadeKey((prev) => prev + 1);
      setMenuOpen(false);
      setImagesLoaded(false);

      setTimeout(() => {
        const refreshBtn = document.querySelector(".refresh-button");
        refreshBtn?.blur();
      }, 250);
    }, 250);
  };

  const handleVideoClick = (src) => setZoomedVideo(src);
  const handleImageClick = (src) => setZoomedImage(src);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      refreshButtonRef.current?.blur();

      setActiveSection(null);
      setZoomedImage(null);
      setZoomedVideo(null);
      setFadeKey((prev) => prev + 1);
      setImagesLoaded(true);
      headerRef.current?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => setIsRefreshing(false), 200);
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
        .forEach((row) => row.classList.toggle("single", row.children.length === 1));
    }, 100);

    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [imagesLoaded]);


  const toggleMenu = () => setMenuOpen((prev) => !prev);


  const handleClickOutside = (event) => {
    if (menuOpen && menuRef.current && hamburgerRef.current && !menuRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);


  useEffect(() => {
    document.body.classList.toggle("blurred", menuOpen);
    return () => document.body.classList.remove("blurred");
  }, [menuOpen]);

  const handleGenreClick = () => {
    setMenuOpen(false);
    document.body.classList.remove("blurred");
  };

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= 780);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <button className="hamburger" ref={hamburgerRef} onClick={toggleMenu}>
            &#9776;
          </button>

          <div className={`blur-overlay ${menuOpen ? 'show' : ''}`}></div>

          <div className={`click-blocker ${menuOpen ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}></div>

          <div ref={menuRef} className={`nav-links ${menuOpen ? 'show' : ''}`} id="navLinks">
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
          <h2>
            {isMobile
              ? "Tap the button at the upper right corner to explore Chill's 3D art!"
              : "Select a category above to view Chill's 3D creations!"}
          </h2>
          <p>
            {isMobile
              ? "Interior, environments, donuts — tap to begin exploring."
              : "Interior, environments, donuts, or just some fun renders — take your pick!"}
          </p>
        </div>
      )}

      {/* Art and Display Section */}
      {activeSection === "interior" && (
        <div key={fadeKey}
          id="interior"
          className={`art-section genre-title 
        ${imagesLoaded ? 'fade-ingenres' : ''}
        ${isRefreshing ? 'fade-out' : 'fade-ingenres'}`}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage1)
                  }}
                />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image2"
                  src={renderImage3}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage3);
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage4);
                  }}
                />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image4"
                  src={renderImage9}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage9)
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image5"
                  src={renderImage13}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage13)
                  }}
                />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image6"
                  src={renderImage22}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video12);
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video2);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image2"
                  src={renderImage6}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage6);
                  }} />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image3"
                  src={renderImage7}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage7);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image4"
                  src={renderImage11}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage11);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image5"
                  src={renderImage12}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video5);
                  }} />
              </div>
            </div>

            <div className="belowimage-container2">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image6"
                  src={renderImage15}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video6);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image7"
                  src={renderImage18}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage18);
                  }} />
              </div>
            </div>

            <div className="belowimage-container3">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image8"
                  src={renderImage19}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video9)
                  }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video1);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="donut-image3"
                  src={renderImage20}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video10);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="donut-image2"
                  src={renderImage10}
                  alt="Blender Render"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVideoClick(video4);
                  }} />
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
        >

          <div className={`fade-wrapper ${imagesLoaded ? 'fade-in' : ''}`}>
            <h2>Miscellaneous</h2>
            <div className="image-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image1"
                  src={renderImage8}
                  alt="Misc 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video3);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image2"
                  src={renderImage14}
                  alt="Misc 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage14);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image3"
                  src={renderImage16}
                  alt="Misc 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video7);
                  }} />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image4"
                  src={renderImage17}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video8);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image6"
                  src={renderImage23}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(renderImage23);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image5"
                  src={renderImage21}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video11);
                  }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {!activeSection && (<section className={`footer"
        ${isRefreshing ? 'fade-outwebsite' : 'fade-inwebsite'}`}>

        <div className="footer-text" key={fadeKey}>
          <h1>Softwares Used</h1>

          <div className="software-columns">
            <section className="blender">
              <img className="blender-logo" src={blenderlogo} alt="Blender Logo" />
              <div className="blender-description">
                <h2>Blender</h2>
                <p>
                  Blender is a powerful open-source 3D creation suite. It supports the
                  entirety of the 3D pipeline, including modeling, rigging, animation,
                  simulation, rendering, compositing, and motion tracking.
                  All of the renders you see here were made using Blender.<br />
                  <a href="https://www.blender.org/" target="_blank" rel="noopener noreferrer">
                    Visit Blender's official website
                  </a>
                </p>
              </div>
            </section>

            <section className="after_effects">
              <img className="ae-logo" src={aftereffectslogo} alt="AE Logo" />
              <div className="ae-description">
                <h2>Adobe After Effects</h2>
                <p>
                  After Effects is a digital visual effects, motion graphics, and
                  compositing application developed by Adobe Systems. It is used to create the
                  animations and effects in the videos you see here. <br />
                  <a href="https://www.adobe.com/products/aftereffects.html" target="_blank" rel="noopener noreferrer">
                    Visit After Effects' official website
                  </a>
                </p>
              </div>
            </section>

            <section className="adobe_premiere">
              <img className="ap-logo" src={premierelogo} alt="AP Logo" />
              <div className="ap-description">
                <h2>Adobe Premiere Pro</h2>
                <p>
                  Premiere Pro is a timeline-based video editing software application
                  developed by Adobe Systems. It is used to edit the videos you see here.
                  <br />
                  <a href="https://www.adobe.com/products/premiere.html" target="_blank" rel="noopener noreferrer">
                    Visit Premiere Pro's official website
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
      )}

      {!activeSection && (<div className={`social-medias
      ${isRefreshing ? 'fade-outwebsite' : 'fade-inwebsite'}`}>
        <h1>Social Media</h1>
        <div className="social-media-icons">
          <a href="https://www.instagram.com/chilldawnn_/" target="_blank" rel="noopener noreferrer">
            <img className="instagram-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
          </a>

          <a href="https://www.youtube.com/@chilly6605" target="_blank" rel="noopener noreferrer">
            <img className="youtube-logo" src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" />
          </a>
        </div>
      </div>
      )}

      {!activeSection && (
        <div className={`${isRefreshing ? 'fade-outwebsite' : 'fade-inwebsite'}`}>
          <h3 className="footer-credit">This website was made by chillysauce</h3>
        </div>
      )}
      <button
        className={`back-to-top ${showTopButton ? '' : 'back-to-top-hidden'}`}
        onClick={(e) => {

          e.stopPropagation();
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


export default ArtGallery;