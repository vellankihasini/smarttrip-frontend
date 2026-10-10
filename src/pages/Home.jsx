
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const destinations = [
  {
    name: "Swiss Alps",
    location: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
    description: "Mountain views, peaceful lakes and unforgettable adventures.",
  },
  {
    name: "Bali",
    location: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    description: "Tropical beaches, temples and beautiful green landscapes.",
  },
  {
    name: "Paris",
    location: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    description: "Romantic streets, famous landmarks and charming cafés.",
  },
  {
    name: "Manali",
    location: "Himachal Pradesh, India",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    description: "Snowy peaks, mountain roads and refreshing escapes.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  function searchDestination(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const destination = form.get("destination")?.toString().trim();

    if (destination) {
      navigate(`/explore?destination=${encodeURIComponent(destination)}`);
    } else {
      navigate("/explore");
    }
  }

  return (
    <div className="home-page">
      <Navbar />

      <main>
        <section className="home-hero">
          <div className="home-hero-content">
            <p className="home-eyebrow">✧ YOUR JOURNEY, YOUR WAY</p>

            <h1>
              The world is waiting.
              <br />
              <span>Let's make it yours.</span>
            </h1>

            <p className="home-description">
              Discover incredible destinations, organize memorable
              experiences, and plan your next adventure in one place.
            </p>

            <form className="home-search" onSubmit={searchDestination}>
              <span className="home-location-icon">⌖</span>
              <input
                name="destination"
                type="text"
                placeholder="Where would you love to go?"
                aria-label="Destination"
              />
              <button type="submit">⌕ Explore</button>
            </form>

            <div className="home-hero-actions">
              <button
                type="button"
                className="home-primary-button"
                onClick={() => navigate("/create-trip")}
              >
                Start planning <span>→</span>
              </button>

              <button
                type="button"
                className="home-secondary-button"
                onClick={() => navigate("/explore")}
              >
                Discover destinations
              </button>
            </div>

            <p className="home-caption">
              ◉ From weekend escapes to once-in-a-lifetime adventures
            </p>
          </div>

          <p className="home-image-caption">
            Your next favourite place is out there.
          </p>
        </section>

        <section className="home-destinations">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">A WORLD OF POSSIBILITIES</p>
              <h2>Where will you go next?</h2>
              <p>
                Find inspiration for your next adventure, near or far.
              </p>
            </div>

            <button
              type="button"
              className="home-view-all"
              onClick={() => navigate("/explore")}
            >
              View all destinations <span>→</span>
            </button>
          </div>

          <div className="home-destination-grid">
            {destinations.map((destination) => (
              <article
                className="home-destination-card"
                key={destination.name}
              >
                <button
                  type="button"
                  className="home-destination-image-button"
                  onClick={() =>
                    navigate(
                      `/explore?destination=${encodeURIComponent(
                        destination.name
                      )}`
                    )
                  }
                  aria-label={`Explore ${destination.name}`}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                  />
                </button>

                <div className="home-destination-info">
                  <p>📍 {destination.location}</p>
                  <h3>{destination.name}</h3>
                  <p className="home-destination-description">
                    {destination.description}
                  </p>

                  <button
                    type="button"
                    className="home-card-link"
                    onClick={() =>
                      navigate(
                        `/explore?destination=${encodeURIComponent(
                          destination.name
                        )}`
                      )
                    }
                  >
                    Explore destination →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-cta">
          <p className="home-eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>
          <h2>Make room for new memories.</h2>
          <p>Discover places, save favourites and plan your next trip.</p>
          <button
            type="button"
            className="home-primary-button"
            onClick={() => navigate("/explore")}
          >
            Explore destinations →
          </button>
        </section>
      </main>

      <footer className="home-footer">
        <strong>✦ SmartTrip</strong>
        <p>Plan smarter. Travel better.</p>
        <p>© 2026 SmartTrip. All rights reserved.</p>
      </footer>
    </div>
  );
}
