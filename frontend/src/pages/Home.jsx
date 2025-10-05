
import { Link } from "react-router-dom";
import Login from "../components/Login";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Connect. Volunteer. Make a Difference.</h1>
          <p className="hero-subtitle">
            Join thousands of volunteers making an impact in their communities. 
            Find opportunities that match your passion and skills.
          </p>
          <div className="cta-buttons">
            <Link to="/opportunities">
              <button className="primary-button">Find Opportunities</button>
            </Link>
            <button className="secondary-button">Post an Opportunity</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose CommUnity?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3 className="feature-title">Easy Discovery</h3>
            <p className="feature-text">
              Browse volunteer opportunities by location, cause, or time commitment.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Direct Connection</h3>
            <p className="feature-text">
              Connect directly with organizations and start making an impact today.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Track Your Impact</h3>
            <p className="feature-text">
              Keep track of your volunteer hours and see the difference you're making.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/*<section className="stats">
        <div className="stat-item">
          <h3 className="stat-number">10,000+</h3>
          <p className="stat-label">Active Volunteers</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">500+</h3>
          <p className="stat-label">Organizations</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">50,000+</h3>
          <p className="stat-label">Hours Volunteered</p>
        </div>
      </section>*/}

      {/* CTA Section */}
      <section className="cta">
        <h2 className="cta-title">Ready to Make a Difference?</h2>
        <p className="cta-text">Join our community of volunteers today.</p>
        {/*<Login />*/}
        {/*<button className="primary-button">Get Started</button>*/}
      </section>
    </div>
  );
}

export default Home;

