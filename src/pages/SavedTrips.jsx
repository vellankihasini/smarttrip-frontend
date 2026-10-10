
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest } from "../Api";
import "./SavedTrips.css";

const FAVORITES_KEY = "smarttripFavorites";

export default function SavedTrips() {
  const [trips, setTrips] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]"
      );
      setFavorites(Array.isArray(saved) ? saved : []);
    } catch {
      setFavorites([]);
    }

    async function loadTrips() {
      try {
        const response = await apiRequest("/trips/saved");
        const data = Array.isArray(response)
          ? response
          : response?.content || response?.trips || [];

        setTrips(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Could not load saved trips:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, []);

  function removeFavorite(id) {
    const updated = favorites.filter(
      (item) => String(item.id) !== String(id)
    );

    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }

  return (
    <>
      <Navbar />

      <main className="saved-page">
        <section className="saved-container">
          <header className="saved-header">
            <span className="saved-eyebrow">YOUR TRAVEL COLLECTION</span>
            <h1>Saved Trips <span>♥</span></h1>
            <p>Your favourite destinations and trips, all in one place.</p>
          </header>

          {loading ? (
            <p className="saved-message">Loading your saved trips...</p>
          ) : (
            <>
              <section className="saved-section">
                <h2>❤️ Favourite Places</h2>

                {favorites.length === 0 ? (
                  <div className="saved-empty">
                    <span className="saved-empty-icon">♡</span>
                    <h3>No favourite places yet</h3>
                    <p>Explore destinations and add your favourite places here.</p>
                  </div>
                ) : (
                  <div className="saved-grid">
                    {favorites.map((place, index) => (
                      <article
                        className="saved-card"
                        key={place.id ?? place.name ?? index}
                      >
                        {place.image && (
                          <img
                            className="saved-image"
                            src={place.image}
                            alt={place.name || "Saved destination"}
                          />
                        )}

                        <div className="saved-card-content">
                          <h3>{place.name || place.title || "Favourite place"}</h3>
                          {place.location && <p>📍 {place.location}</p>}
                          {place.description && <p>{place.description}</p>}

                          <button
                            className="remove-favorite"
                            onClick={() => removeFavorite(place.id)}
                          >
                            ♥ Remove favourite
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              <section className="saved-section">
                <h2>🧳 Saved Trips</h2>

                {trips.length === 0 ? (
                  <div className="saved-empty">
                    <span className="saved-empty-icon">✈</span>
                    <h3>No saved trips yet</h3>
                    <p>Create a trip and save it to see it here.</p>
                  </div>
                ) : (
                  <div className="saved-grid">
                    {trips.map((trip) => (
                      <article className="saved-card" key={trip.id}>
                        <div className="saved-card-content">
                          <h3>{trip.title || trip.destination}</h3>
                          <p>📍 {trip.destination}</p>

                          {trip.startDate && (
                            <p>
                              📅 {trip.startDate}
                              {trip.endDate ? ` to ${trip.endDate}` : ""}
                            </p>
                          )}

                          {trip.budget != null && (
                            <p>
                              💰 Budget: ₹
                              {Number(trip.budget).toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </section>
      </main>

      <footer className="saved-footer">
        <strong>🗺 SmartTrip</strong>
        <p>Plan smarter. Travel better.</p>
        <p>© 2026 SmartTrip. All rights reserved.</p>
      </footer>
    </>
  );
}
