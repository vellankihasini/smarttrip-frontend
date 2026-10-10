
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Plus, CalendarDays, Wallet } from "lucide-react";
import { apiRequest } from "../Api";
import "./Pages.css";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/trips")
      .then((data) => {
        setTrips(Array.isArray(data) ? data : data.trips || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="content-page">
      <div className="page-heading">
        <span className="page-eyebrow">YOUR TRAVEL SPACE</span>
        <h1>Your Travel Dashboard ✈️</h1>
        <p>All your adventures, organised in one place.</p>
        <Link to="/create-trip" className="primary-action">
          <Plus size={18} /> Create a Trip
        </Link>
      </div>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <h2>My Trips</h2>
            <p>Your upcoming and saved adventures.</p>
          </div>
          <span className="count-pill">{trips.length} trips</span>
        </div>

        {loading && <p className="page-message">Loading your trips...</p>}

        {error && (
          <p className="page-message error-message" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && trips.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"><MapPin size={28} /></div>
            <h3>Your next adventure starts here</h3>
            <p>You haven't created any trips yet. Let's plan your first one!</p>
            <Link to="/create-trip" className="primary-action">
              <Plus size={18} /> Plan my first trip
            </Link>
          </div>
        )}

        {!loading && !error && trips.length > 0 && (
          <div className="page-card-grid">
            {trips.map((trip) => (
              <article className="page-card" key={trip.id}>
                <div className="page-card-icon"><MapPin size={22} /></div>
                <h3>{trip.destination || "Untitled trip"}</h3>
                <p className="card-detail">
                  <CalendarDays size={16} />
                  {trip.startDate || "Dates not set"}
                  {trip.endDate ? ` – ${trip.endDate}` : ""}
                </p>
                <p className="card-detail">
                  <Wallet size={16} />
                  {trip.budget != null
                    ? `Budget: ₹${Number(trip.budget).toLocaleString("en-IN")}`
                    : "No budget set"}
                </p>
                <Link className="text-action" to={`/trips/${trip.id}`}>
                  View trip details →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
