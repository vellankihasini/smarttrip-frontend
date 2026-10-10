
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search, MapPin, Star, Hotel, Camera, Compass,
  ArrowRight, Clock, CalendarDays
} from "lucide-react";
import "./Explore.css";

const places = {
  Paris: {
    country: "France",
    tagline: "Art, romance and iconic architecture.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
    attractions: [
      ["Eiffel Tower", "Iconic landmark and city views", "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=700&q=80"],
      ["Louvre Museum", "World-famous art and exhibitions", "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=700&q=80"],
      ["Montmartre", "Artistic streets and cafés", "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=700&q=80"]
    ],
    hotels: [
      ["Boutique city hotel", "Central location · Comfortable rooms", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"],
      ["Riverside stay", "Scenic surroundings · Relaxing stay", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80"]
    ],
    activities: ["Seine river cruise", "French pastry and café tour", "Evening city photography"]
  },
  Bali: {
    country: "Indonesia",
    tagline: "Tropical shores, temples and lush landscapes.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85",
    attractions: [
      ["Uluwatu Temple", "Clifftop temple and ocean views", "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80"],
      ["Tegallalang Rice Terraces", "Green landscapes and scenic walks", "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80"],
      ["Ubud", "Local crafts, markets and culture", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80"]
    ],
    hotels: [
      ["Tropical resort", "Poolside relaxation · Garden views", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80"],
      ["Ubud nature retreat", "Green surroundings · Peaceful setting", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"]
    ],
    activities: ["Balinese cooking class", "Snorkelling and beach time", "Waterfall and rice terrace tour"]
  },
  Tokyo: {
    country: "Japan",
    tagline: "Neon city streets and timeless traditions.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=85",
    attractions: [
      ["Senso-ji Temple", "Historic temple in Asakusa", "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80"],
      ["Shibuya Crossing", "Famous and energetic city crossing", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80"],
      ["Shinjuku", "City lights, shops and nightlife", "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=700&q=80"]
    ],
    hotels: [
      ["Modern city hotel", "Convenient transport · Contemporary rooms", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"],
      ["Traditional-style stay", "Calm interiors · Japanese atmosphere", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80"]
    ],
    activities: ["Sushi-making workshop", "Traditional tea experience", "Explore local food markets"]
  },
  Manali: {
    country: "India",
    tagline: "Mountain air, pine forests and Himalayan views.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85",
    attractions: [
      ["Solang Valley", "Mountain scenery and outdoor adventure", "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80"],
      ["Hadimba Temple", "Historic temple surrounded by forest", "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80"],
      ["Old Manali", "Cafés, local shops and riverside walks", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80"]
    ],
    hotels: [
      ["Mountain-view hotel", "Scenic views · Comfortable rooms", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80"],
      ["Cozy nature retreat", "Forest setting · Peaceful surroundings", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"]
    ],
    activities: ["Guided mountain hike", "Local Himachali food experience", "Visit nearby waterfalls"]
  },
  Goa: {
    country: "India",
    tagline: "Golden beaches, coastal food and laid-back days.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85",
    attractions: [
      ["Baga Beach", "Beachfront cafés and water activities", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80"],
      ["Fort Aguada", "Historic fort and sea views", "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=80"],
      ["Fontainhas", "Colourful heritage streets", "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80"]
    ],
    hotels: [
      ["Beachside resort", "Coastal setting · Leisure facilities", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80"],
      ["Boutique guesthouse", "Relaxed atmosphere · Local character", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"]
    ],
    activities: ["Dolphin-watching boat trip", "Portuguese heritage walk", "Beach sunset and local food tour"]
  },
  Jaipur: {
    country: "India",
    tagline: "Royal architecture, colourful markets and rich heritage.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1400&q=85",
    attractions: [
      ["Hawa Mahal", "Famous pink sandstone façade", "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=700&q=80"],
      ["Amber Fort", "Historic hilltop fort and courtyards", "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=700&q=80"],
      ["City Palace", "Royal architecture and collections", "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=700&q=80"]
    ],
    hotels: [
      ["Heritage hotel", "Traditional architecture · Courtyard", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"],
      ["Modern city stay", "Convenient location · Contemporary comfort", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80"]
    ],
    activities: ["Rajasthani cooking class", "Heritage walking tour", "Explore traditional bazaars"]
  }
};

const extraDestinations = [
  { name: "Paris", country: "France", image: places.Paris.image },
  { name: "Bali", country: "Indonesia", image: places.Bali.image },
  { name: "Tokyo", country: "Japan", image: places.Tokyo.image },
  { name: "Manali", country: "India", image: places.Manali.image },
  { name: "Goa", country: "India", image: places.Goa.image },
  { name: "Jaipur", country: "India", image: places.Jaipur.image }
];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("destination") || "";
  const [search, setSearch] = useState(initial);
  const [selected, setSelected] = useState(
    places[initial] ? initial : ""
  );
  const [category, setCategory] = useState("Attractions");

  const filtered = useMemo(
    () =>
      extraDestinations.filter((destination) =>
        `${destination.name} ${destination.country}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  function chooseDestination(name) {
    setSelected(name);
    setSearch(name);
    setSearchParams({ destination: name });
    setCategory("Attractions");
  }

  const destination = places[selected];

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <div className="explore-hero-copy">
          <span className="explore-eyebrow">
            <Compass size={15} /> FIND YOUR NEXT ADVENTURE
          </span>
          <h1>Places worth <span>discovering.</span></h1>
          <p>
            Find beautiful destinations, famous landmarks, places to stay,
            and memorable experiences for your next trip.
          </p>

          <label className="explore-search">
            <Search size={20} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelected("");
              }}
              placeholder="Search Paris, Bali, Tokyo..."
              aria-label="Search destinations"
            />
          </label>
        </div>
      </section>

      <section className="explore-content">
        {!selected && (
          <>
            <div className="explore-heading">
              <div>
                <span className="explore-eyebrow">TRAVEL INSPIRATION</span>
                <h2>Choose your destination</h2>
                <p>Select a place to explore attractions, stays and activities.</p>
              </div>
            </div>

            <div className="explore-destination-grid">
              {filtered.map((item) => (
                <button
                  className="explore-destination-card"
                  key={item.name}
                  onClick={() => chooseDestination(item.name)}
                  type="button"
                >
                  <img src={item.image} alt={item.name} />
                  <div className="explore-card-overlay">
                    <span><MapPin size={14} /> {item.country}</span>
                    <h3>{item.name}</h3>
                    <span className="explore-discover">
                      Explore destination <ArrowRight size={15} />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="explore-empty">
                <Compass size={32} />
                <h3>No matching destination yet</h3>
                <p>Try Paris, Bali, Tokyo, Manali, Goa or Jaipur.</p>
              </div>
            )}
          </>
        )}

        {destination && (
          <>
            <button
              className="explore-back"
              onClick={() => {
                setSelected("");
                setSearch("");
                setSearchParams({});
              }}
              type="button"
            >
              ← All destinations
            </button>

            <section className="explore-destination-hero">
              <img src={destination.image} alt={selected} />
              <div>
                <span className="explore-eyebrow">
                  <MapPin size={14} /> {destination.country}
                </span>
                <h2>{selected}</h2>
                <p>{destination.tagline}</p>
                <Link
                  to="/create-trip"
                  className="explore-plan-button"
                >
                  Plan a trip here <ArrowRight size={17} />
                </Link>
              </div>
            </section>

            <div className="explore-tabs">
              {["Attractions", "Hotels", "Activities"].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item === "Attractions" && <Camera size={16} />}
                  {item === "Hotels" && <Hotel size={16} />}
                  {item === "Activities" && <Compass size={16} />}
                  {item}
                </button>
              ))}
            </div>

            <div className="explore-heading explore-detail-heading">
              <div>
                <span className="explore-eyebrow">
                  DISCOVER {selected.toUpperCase()}
                </span>
                <h2>
                  {category === "Attractions"
                    ? "Famous places to visit"
                    : category === "Hotels"
                    ? "Places to stay"
                    : "Things to experience"}
                </h2>
                <p>
                  {category === "Attractions"
                    ? "Add iconic sights and local favourites to your itinerary."
                    : category === "Hotels"
                    ? "Explore example accommodation styles for your trip."
                    : "Find ideas for making your trip more memorable."}
                </p>
              </div>
            </div>

            {category === "Activities" ? (
              <div className="explore-activity-grid">
                {destination.activities.map((activity, index) => (
                  <article className="explore-activity-card" key={activity}>
                    <div className="explore-activity-icon">
                      <CalendarDays size={21} />
                    </div>
                    <span>EXPERIENCE {index + 1}</span>
                    <h3>{activity}</h3>
                    <p>Consider adding this experience to your travel plan.</p>
                    <Link to="/create-trip">
                      Plan this experience <ArrowRight size={15} />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="explore-place-grid">
                {(category === "Attractions"
                  ? destination.attractions
                  : destination.hotels
                ).map(([name, description, image]) => (
                  <article className="explore-place-card" key={name}>
                    <div className="explore-place-image">
                      <img src={image} alt={name} loading="lazy" />
                      <span>
                        {category === "Hotels" ? (
                          <Hotel size={14} />
                        ) : (
                          <Camera size={14} />
                        )}
                        {category === "Hotels" ? "Stay idea" : "Place to visit"}
                      </span>
                    </div>
                    <div className="explore-place-body">
                      <h3>{name}</h3>
                      <p>{description}</p>
                      <Link
                        to="/create-trip"
                        onClick={() =>
                          sessionStorage.setItem(
                            "smarttripSearchDestination",
                            selected
                          )
                        }
                      >
                        Add to trip planning <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
