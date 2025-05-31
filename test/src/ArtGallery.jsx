import React, { useState, useEffect, useRef } from 'react';
import './main.css';

import blenderlogo from './logos/Blender_logo_no_text.svg.png';
import aftereffectslogo from './logos/Adobe_After_Effects.png';
import premierelogo from './logos/Adobe_Premiere_Pro.png';

import { interior_images, environment_images, donut_images, misc_images } from './media.js';
import { interior_videos, environment_videos, donut_videos, misc_videos } from './media.js';

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

  const handleNavClick = (sectionId) => { //For clicking the four buttons at the top
    if (activeSection === sectionId) return;

    if (activeSection !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" }); //Scroll to the top before changing sections
    }

    setTimeout(() => { // Delay to ensure smooth transition
      setActiveSection(sectionId);
      setFadeKey((prev) => prev + 1);
      setMenuOpen(false);
      setImagesLoaded(false);

      setTimeout(() => { // Ensure the refresh button is blurred after the section change
        const refreshBtn = document.querySelector(".refresh-button");
        refreshBtn?.blur();
      }, 250);
    }, 250);
  };

  const handleVideoClick = (src) => setZoomedVideo(src);
  const handleImageClick = (src) => setZoomedImage(src);

  const handleRefresh = () => { // Refresh button
    setIsRefreshing(true);

    setTimeout(() => { // Delay to allow fade-out effect
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

  const closeZoom = () => { // Close zoomed image or video
    setIsClosingZoom(true);
    setTimeout(() => {
      setZoomedImage(null);
      setZoomedVideo(null);
      setIsClosingZoom(false);
    }, 300); //300 milliseconds for fade-out effect
  };

  const handleImageLoad = () => { // Handle image load event
    imagesToLoadRef.current -= 1;
    if (imagesToLoadRef.current <= 0) {
      setImagesLoaded(true);
    }
  };

  useEffect(() => { // Handle section change and apply single class to rows with one child
    const timer = setTimeout(() => {
      document
        .querySelectorAll(".image-container, .belowimage-container")
        .forEach((row) => row.classList.toggle("single", row.children.length === 1));
    }, 100); // Delay to ensure the DOM is updated 100 milliseconds after state change

    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => { // Handle scroll to show/hide back-to-top button
    const handleScroll = () => setShowTopButton(window.scrollY > 300); //If y-axis is > 300px, show the button
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { // Load images and videos when the active section changes
    if (activeSection) {
      const images = document.querySelectorAll(`#${activeSection} img`);
      const videos = document.querySelectorAll(`#${activeSection} video`);
      imagesToLoadRef.current = images.length + videos.length;

      if (imagesToLoadRef.current === 0) {
        setImagesLoaded(true);
      } // If there are no images or videos, set imagesLoaded to true
    }
  }, [activeSection]);

  useEffect(() => { // Images are being scrolled to the top when they are loaded
    if (imagesLoaded) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [imagesLoaded]);


  const toggleMenu = () => setMenuOpen((prev) => !prev); //Open or close the menu


  const handleClickOutside = (event) => { //Close the menu when clicking outside of it
    if (menuOpen && menuRef.current && hamburgerRef.current && !menuRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]); //Add event listener to close the menu when clicking outside of it


  useEffect(() => {
    document.body.classList.toggle("blurred", menuOpen);
    return () => document.body.classList.remove("blurred");
  }, [menuOpen]); // This will add a blurred effect to the body when the menu is open

  const handleGenreClick = () => { // Close the menu when a genre button is clicked
    setMenuOpen(false);
    document.body.classList.remove("blurred");
  };

  useEffect(() => { // Handle mobile responsiveness
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
          <h1>Chill's Renders</h1>
          <p>
            Welcome to my renders — a showcase of various 3D artworks by Chill. 
             <br /> Browse around and explore each genre to witness each creation.
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
                  src={interior_images.interior1}
                  alt="Interior 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(interior_images.interior1);
                  }}
                />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image2"
                  src={interior_images.interior2}
                  alt="Interior 2"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(interior_images.interior2);
                  }}
                />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image3"
                  src={interior_images.interior3}
                  alt="Interior 3"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(interior_images.interior3);
                  }}
                />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image4"
                  src={interior_images.interior4}
                  alt="Interior 4"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(interior_images.interior4);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image5"
                  src={interior_images.interior5}
                  alt="Interior 5"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(interior_images.interior5);
                  }}
                />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="interior-image6"
                  src={interior_images.interior6}
                  alt="Interior 6"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(interior_videos.int_video1);
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
                  src={environment_images.environment1}
                  alt="Environmental Design 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(environment_videos.env_video1);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image2"
                  src={environment_images.environment2}
                  alt="Environmental Design 2"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(environment_images.environment2);
                  }} />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image3"
                  src={environment_images.environment3}
                  alt="Environmental Design 3"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(environment_images.environment3);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image4"
                  src={environment_images.environment4}
                  alt="Environmental Design 4"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(environment_images.environment4);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image5"
                  src={environment_images.environment5}
                  alt="Environmental Design 5"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(environment_videos.env_video2);
                  }} />
              </div>
            </div>

            <div className="belowimage-container2">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image6"
                  src={environment_images.environment6}
                  alt="Environmental Design 6"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(environment_videos.env_video3);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image7"
                  src={environment_images.environment7}
                  alt="Environmental Design 7"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(environment_images.environment7);
                  }} />
              </div>
            </div>

            <div className="belowimage-container3">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="environment-image8"
                  src={environment_images.environment8}
                  alt="Environmental Design 8"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(environment_videos.env_video4);
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
                  src={donut_images.donut1}
                  alt="Donut 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(donut_videos.donut_video1);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="donut-image3"
                  src={donut_images.donut3}
                  alt="Donut 3"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(donut_videos.donut_video3);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="donut-image2"
                  src={donut_images.donut2}
                  alt="Donut 2"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVideoClick(donut_videos.donut_video2);
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
                  src={misc_images.misc1}
                  alt="Misc 1"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(misc_videos.misc1);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image2"
                  src={misc_images.misc2}
                  alt="Misc 2"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(misc_images.misc2);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image3"
                  src={misc_images.misc3}
                  alt="Misc 3"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(misc_videos.misc2);
                  }} />
              </div>
            </div>

            <div className="belowimage-container">
              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image4"
                  src={misc_images.misc4}
                  alt="Misc 4"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(misc_videos.misc3);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image6"
                  src={misc_images.misc6}
                  alt="Misc 6"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(misc_images.misc6);
                  }} />
              </div>

              <div className={`rendering ${imagesLoaded ? 'loaded' : 'loading'}`}>
                <img className="misc-image5"
                  src={misc_images.misc5}
                  alt="Misc 5"
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(misc_videos.misc4);
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