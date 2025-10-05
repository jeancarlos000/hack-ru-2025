import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">CommUnity</h1>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/opportunities" className="navbar-link">Opportunities</Link>
        <Link to="/about" className="navbar-link">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
