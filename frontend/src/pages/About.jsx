import React from "react";
import "../styles.css"; // assuming your global CSS is here

const About = () => {
  return (
    <div className="about-container">
      <div className="hero" style={{ padding: "4rem 2rem" }}>
        <div className="hero-content">
          <h1 className="hero-title">About CommUnity</h1>
          <p className="hero-subtitle">
            CommUnity is a platform designed to make volunteering accessible
            to everyone. Our mission is to connect people with meaningful
            volunteer opportunities of all kinds — local, remote, or global — so
            everyone can contribute in ways that matter to them.
          </p>
        </div>
      </div>

      <div className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-title">Discover Opportunities</div>
            <div className="feature-text">
              Browse a wide variety of volunteer opportunities that match your
              skills, interests, and schedule.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-title">Learn & Grow</div>
            <div className="feature-text">
              Gain experience, meet like-minded people, and make a meaningful
              impact in your community or globally.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-title">Simplify Volunteering</div>
            <div className="feature-text">
              Our platform aggregates opportunities from verified sources so you
              can focus on taking action, not searching.
            </div>
          </div>
        </div>
      </div>

      <div className="cta" style={{ textAlign: "center" }}>
        <h2 className="cta-title">Get Started</h2>
        <p className="cta-text">
          Explore volunteer opportunities today and start making an impact!
        </p>
        <div className="cta-buttons" style={{ justifyContent: "center" }}>
          <a href="/opportunities" className="primary-button">
            Explore Opportunities
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

