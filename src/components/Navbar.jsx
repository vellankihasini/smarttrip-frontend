
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("smarttripToken");

  function logout() {
    localStorage.removeItem("smarttripToken");
    localStorage.removeItem("smarttripUser");
    navigate("/login", { replace: true });
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SmartTrip
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create-trip">Create Trip</Link>
            <Link to="/saved-trips">Saved Trips</Link>
            <Link to="/budget">Budget</Link>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
