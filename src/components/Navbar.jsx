
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("smarttripToken"));

  function handleLogout() {
    localStorage.removeItem("smarttripToken");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="navbar-logo-icon">✦</span>
        <span>SmartTrip</span>
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-trip">Create Trip</Link>
        <Link to="/saved-trips">Saved Trips</Link>
        <Link to="/assistant">AI Assistant</Link>

        {isLoggedIn ? (
          <button
            type="button"
            className="navbar-action"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar-action">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
