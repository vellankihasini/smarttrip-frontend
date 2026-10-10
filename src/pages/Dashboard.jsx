
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../Api";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/trips")
      .then((data) => setTrips(Array.isArray(data) ? data : data.trips || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="dashboard-page">
      <h1>Your Travel Dashboard ✈️</h1>
      <p>All your adventures, organised in one place.</p>

      <Link to="/create-trip" className="trip-submit-button">
        + Create a Trip
      </Link>

      {loading && <p>Loading your trips...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && trips.length === 0 && (
        <p>You haven't saved any trips yet. Create your first adventure!</p>
      )}

      <div className="dashboard-trips">
        {trips.map((trip) => (
          <article className="dashboard-trip-card" key={trip.id}>
            <h2>{trip.destination}</h2>
            <p>{trip.startDate} to {trip.endDate}</p>
            <p>Budget: ₹{Number(trip.budget || 0).toLocaleString("en-IN")}</p>
            <Link to={`/trips/${trip.id}`}>View detailed plan →</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
