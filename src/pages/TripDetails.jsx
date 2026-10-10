
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../Api";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiRequest(`/trips/${id}`),
      apiRequest(`/trips/${id}/itinerary`),
    ])
      .then(([tripData, itineraryData]) => {
        setTrip(tripData);
        setItems(
          Array.isArray(itineraryData)
            ? itineraryData
            : itineraryData.items || []
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="dashboard-page">Loading trip...</main>;
  if (error) return <main className="dashboard-page"><p role="alert">{error}</p></main>;
  if (!trip) return <main className="dashboard-page">Trip not found.</main>;

  return (
    <main className="dashboard-page">
      <Link to="/dashboard">← My Trips</Link>
      <h1>{trip.destination}</h1>
      <p>{trip.startDate} to {trip.endDate}</p>
      <p>Budget: ₹{Number(trip.budget || 0).toLocaleString("en-IN")}</p>

      <h2>Your day-by-day itinerary</h2>

      {items.length === 0 && (
        <p>No activities have been added to this itinerary yet.</p>
      )}

      {items.map((item) => (
        <article className="dashboard-trip-card" key={item.id}>
          <h3>Day {item.dayNumber || item.day || 1}: {item.title || item.place}</h3>
          <p>{item.time || item.startTime || "Time not set"}</p>
          <p>{item.description || item.notes || ""}</p>
          <p>Estimated cost: ₹{Number(item.cost || 0).toLocaleString("en-IN")}</p>
        </article>
      ))}
    </main>
  );
}
