
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../Api";

export default function SavedTrips() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/saved-trips")
      .then((data) => setTrips(Array.isArray(data) ? data : data.trips || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="dashboard-page">
      <h1>Saved Trips ❤️</h1>
      <p>Your saved adventures, ready to revisit.</p>

      {error && <p role="alert">{error}</p>}

      {trips.length === 0 && !error && (
        <p>No saved trips found.</p>
      )}

      {trips.map((trip) => (
        <article className="dashboard-trip-card" key={trip.id}>
          <h2>{trip.destination || trip.trip?.destination || "Saved trip"}</h2>
          <Link to={`/trips/${trip.id || trip.trip?.id}`}>
            Open trip →
          </Link>
        </article>
      ))}
    </main>
  );
}
