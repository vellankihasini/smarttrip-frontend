
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../Api";
import "./CreateTrip.css";

const interestOptions = [
  "Nature",
  "Adventure",
  "Beaches",
  "Food",
  "Shopping",
  "History",
  "Photography",
  "Relaxation",
];

export default function CreateTrip() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: new URLSearchParams(window.location.search).get("destination") || "",
    startDate: "",
    endDate: "",
    members: [{ name: "", age: "" }],
    budget: "",
    interests: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function updateMember(index, field, value) {
    setForm((previous) => ({
      ...previous,
      members: previous.members.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      ),
    }));
  }

  function addMember() {
    setForm((previous) => ({
      ...previous,
      members: [...previous.members, { name: "", age: "" }],
    }));
  }

  function removeMember(index) {
    setForm((previous) => ({
      ...previous,
      members: previous.members.filter((_, i) => i !== index),
    }));
  }

  function toggleInterest(interest) {
    setForm((previous) => ({
      ...previous,
      interests: previous.interests.includes(interest)
        ? previous.interests.filter((item) => item !== interest)
        : [...previous.interests, interest],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.endDate < form.startDate) {
      setError("Return date must be on or after the start date.");
      return;
    }

    if (Number(form.budget) <= 0) {
      setError("Please enter a budget greater than zero.");
      return;
    }

    if (form.members.some((member) => !member.name.trim())) {
      setError("Please enter a name for every traveller.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        destination: form.destination.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        budget: Number(form.budget),
        travelers: form.members.length,
        members: form.members.map((member) => ({
          name: member.name.trim(),
          age: member.age ? Number(member.age) : null,
        })),
        interests: form.interests,
      };

      const result = await apiRequest("/trips", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const tripId = result?.id ?? result?.tripId;

      if (!tripId) {
        throw new Error(
          "Trip request completed, but the response did not include a trip ID. Check your TripController response."
        );
      }

      navigate(`/trips/${tripId}`);
    } catch (err) {
      setError(err.message || "Unable to save your trip.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="trip-create-page">
      <section className="trip-create-card">
        <p className="trip-eyebrow">YOUR NEXT ADVENTURE</p>
        <h1>Create your trip ✈️</h1>
        <p className="trip-intro">
          Tell us your plans. We'll use these details to organise your itinerary.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <p className="trip-error" role="alert">{error}</p>}

          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            value={form.destination}
            onChange={(e) => updateField("destination", e.target.value)}
            placeholder="e.g. Paris, Bali, Manali"
            required
          />

          <div className="trip-date-grid">
            <div>
              <label htmlFor="startDate">Start date</label>
              <input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="endDate">Return date</label>
              <input
                id="endDate"
                type="date"
                min={form.startDate || undefined}
                value={form.endDate}
                onChange={(e) => updateField("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          <label>Travellers</label>

          {form.members.map((member, index) => (
            <div className="trip-member-row" key={index}>
              <input
                aria-label={`Traveller ${index + 1} name`}
                value={member.name}
                onChange={(e) => updateMember(index, "name", e.target.value)}
                placeholder={`Traveller ${index + 1} name`}
                required
              />

              <input
                aria-label={`Traveller ${index + 1} age`}
                type="number"
                min="1"
                max="120"
                value={member.age}
                onChange={(e) => updateMember(index, "age", e.target.value)}
                placeholder="Age"
              />

              {form.members.length > 1 && (
                <button
                  type="button"
                  className="trip-remove-button"
                  onClick={() => removeMember(index)}
                  aria-label={`Remove traveller ${index + 1}`}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="trip-secondary-button"
            onClick={addMember}
          >
            + Add traveller
          </button>

          <label htmlFor="budget">Total trip budget (₹)</label>
          <input
            id="budget"
            type="number"
            min="1"
            value={form.budget}
            onChange={(e) => updateField("budget", e.target.value)}
            placeholder="e.g. 25000"
            required
          />

          <label>What are you interested in?</label>
          <div className="trip-interest-list">
            {interestOptions.map((interest) => (
              <button
                type="button"
                key={interest}
                className={
                  form.interests.includes(interest)
                    ? "trip-interest selected"
                    : "trip-interest"
                }
                aria-pressed={form.interests.includes(interest)}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>

          <button
            className="trip-submit-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving trip..." : "Save trip and plan itinerary"}
          </button>
        </form>
      </section>
    </main>
  );
}
