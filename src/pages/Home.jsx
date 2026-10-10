
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Wallet,
  Hotel,
  Heart,
  Sparkles,
  Search,
  Map,
  Plane,
  Compass,
  CalendarDays,
  Camera,
} from "lucide-react";
import "./Home.css";

const destinations = [
  {
    name: "Paris",
    country: "France",
    description: "Romantic streets, art and iconic landmarks.",
    tag: "Romantic escape",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bali",
    country: "Indonesia",
    description: "Tropical beaches, temples and lush landscapes.",
    tag: "Island getaway",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Tokyo",
    country: "Japan",
    description: "Modern city life meets traditional culture.",
    tag: "City adventure",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Manali",
    country: "India",
    description: "Mountain views, pine forests and adventure.",
    tag: "Mountain retreat",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
  },
];

const features = [
  {
    icon: Map,
    title: "Personalized itineraries",
    description:
      "Organize your travel days with places to visit and activities to enjoy.",
    link: "/create-trip",
    color: "green",
  },
  {
    icon: Hotel,
    title: "Hotel discovery",
    description:
      "Explore accommodation options and find stays that fit your budget.",
    link: "/explore",
    color: "sand",
  },
  {
    icon: Wallet,
    title: "Budget management",
    description:
      "Plan your spending and keep track of your travel expenses.",
    link: "/budget",
    color: "blue",
  },
  {
    icon: Heart,
    title: "Saved favourites",
    description:
      "Keep your favourite destinations and trips together in one place.",
    link: "/saved-trips",
    color: "rose",
  },
];

const experiences = [
  {
    title: "Famous landmarks",
    category: "SIGHTSEEING",
    description: "Discover the places every traveller remembers.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Beautiful places to stay",
    category: "ACCOMMODATION",
    description: "Find a comfortable base for your adventures.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Unforgettable activities",
    category: "EXPERIENCES",
    description: "Make room for new experiences and local discoveries.",
    image:
      "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const destination = searchText.trim();

    if (!destination) {
      navigate("/explore");
      return;
    }

    sessionStorage.setItem("smarttripSearchDestination", destination);
    navigate("/explore");
  }

  function openDestination(destination) {
    sessionStorage.setItem(
      "smarttripSearchDestination",
      destination
    );
    navigate("/explore");
  }

  return (
    <main className="st-home">
      {/* HERO */}
      <section className="st-hero">
        <div className="st-hero-image" />

        <div className="st-hero-content">
          <span className="st-eyebrow st-hero-eyebrow">
            <Sparkles size={16} />
            YOUR JOURNEY, YOUR WAY
          </span>

          <h1>
            The world is waiting.
            <br />
            <span>Let's make it yours.</span>
          </h1>

          <p>
            Discover incredible destinations, organize memorable
            experiences, and plan your next adventure in one place.
          </p>

          <form className="st-search" onSubmit={handleSearch}>
            <MapPin size={21} />

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Where would you love to go?"
              aria-label="Search for a destination"
            />

            <button type="submit">
              <Search size={18} />
              <span>Explore</span>
            </button>
          </form>

          <div className="st-hero-links">
            <Link to="/create-trip" className="st-btn st-btn-primary">
              Start planning <ArrowRight size={18} />
            </Link>

            <Link to="/explore" className="st-btn st-btn-glass">
              Discover destinations
            </Link>
          </div>

          <div className="st-hero-note">
            <Compass size={16} />
            From weekend escapes to once-in-a-lifetime adventures
          </div>
        </div>

        <div className="st-photo-credit">
          Your next favourite place is out there.
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="st-section st-destinations">
        <div className="st-section-heading">
          <div>
            <span className="st-eyebrow">
              A WORLD OF POSSIBILITIES
            </span>

            <h2>Where will you go next?</h2>

            <p>
              Find inspiration for your next adventure, near or far.
            </p>
          </div>

          <Link to="/explore" className="st-text-link">
            View all destinations <ArrowRight size={17} />
          </Link>
        </div>

        <div className="st-destination-grid">
          {destinations.map((destination) => (
            <button
              type="button"
              className="st-destination-card"
              key={destination.name}
              onClick={() => openDestination(destination.name)}
              aria-label={`Explore ${destination.name}, ${destination.country}`}
            >
              <img
                src={destination.image}
                alt={`${destination.name}, ${destination.country}`}
                loading="lazy"
              />

              <span className="st-destination-tag">
                {destination.tag}
              </span>

              <div className="st-destination-overlay">
                <span>{destination.country}</span>

                <h3>{destination.name}</h3>

                <p>{destination.description}</p>

                <span className="st-card-arrow">
                  Discover <ArrowRight size={16} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="st-section st-features-section">
        <div className="st-section-heading st-centered-heading">
          <div>
            <span className="st-eyebrow">
              YOUR TRAVEL COMPANION
            </span>

            <h2>Everything in one place.</h2>

            <p>
              Less time juggling plans. More time looking forward
              to your journey.
            </p>
          </div>
        </div>

        <div className="st-feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="st-feature-card" key={feature.title}>
                <div
                  className={`st-feature-icon st-feature-icon-${feature.color}`}
                >
                  <Icon size={23} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <Link to={feature.link}>
                  Explore feature <ArrowRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* TRAVEL EXPERIENCES */}
      <section className="st-section st-experiences">
        <div className="st-section-heading">
          <div>
            <span className="st-eyebrow">
              MAKE EVERY DAY COUNT
            </span>

            <h2>Travel your own way.</h2>

            <p>
              Build a journey around the places and experiences you love.
            </p>
          </div>

          <Link to="/explore" className="st-text-link">
            Explore more <ArrowRight size={17} />
          </Link>
        </div>

        <div className="st-experience-grid">
          {experiences.map((experience) => (
            <Link
              to="/explore"
              className="st-experience-card"
              key={experience.title}
            >
              <img
                src={experience.image}
                alt={experience.title}
                loading="lazy"
              />

              <div className="st-experience-overlay">
                <span>{experience.category}</span>

                <h3>{experience.title}</h3>

                <p>{experience.description}</p>

                <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRIP PLANNING CTA */}
      <section className="st-planning-banner">
        <div className="st-banner-decoration">
          <Plane size={100} strokeWidth={0.8} />
        </div>

        <div className="st-banner-content">
          <span className="st-eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h2>Good trips start with a plan.</h2>

          <p>
            Choose your destination, organize your itinerary,
            and keep your travel budget in check.
          </p>

          <Link to="/create-trip" className="st-btn st-btn-primary">
            Plan my trip <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
