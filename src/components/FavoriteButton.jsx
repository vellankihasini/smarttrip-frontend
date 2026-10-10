
import { useEffect, useState } from "react";

const STORAGE_KEY = "smarttripFavorites";

export default function FavoriteButton({ place }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setFavorite(
        saved.some((item) => String(item.id) === String(place.id))
      );
    } catch {
      setFavorite(false);
    }
  }, [place.id]);

  function toggleFavorite() {
    let saved = [];

    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(saved)) saved = [];
    } catch {
      saved = [];
    }

    const exists = saved.some(
      (item) => String(item.id) === String(place.id)
    );

    const updated = exists
      ? saved.filter((item) => String(item.id) !== String(place.id))
      : [...saved, place];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setFavorite(!exists);
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-pressed={favorite}
      style={{
        padding: "10px 16px",
        borderRadius: "10px",
        border: "1px solid #d9e5de",
        background: favorite ? "#e5f4ec" : "#ffffff",
        color: favorite ? "#246347" : "#34483d",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {favorite ? "♥ Favourited" : "♡ Add to Favourites"}
    </button>
  );
}
