
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BudgetSummary from "../components/BudgetSummary";
import { apiRequest } from "../Api";
import "./Budget.css";

export default function Budget() {
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [activities, setActivities] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [saving, setSaving] = useState(false);

  const selectedTrip = trips.find(
    (trip) => String(trip.id) === String(selectedTripId)
  );

  useEffect(() => {
    async function loadTrips() {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest("/trips");
        const data = Array.isArray(response)
          ? response
          : response?.content || response?.trips || [];

        setTrips(data);

        if (data.length > 0) {
          setSelectedTripId(String(data[0].id));
        }
      } catch (err) {
        setError(err.message || "Could not load trips. Please log in again.");
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, []);

  useEffect(() => {
    if (!selectedTripId) {
      setActivities([]);
      setExpenses([]);
      return;
    }

    let cancelled = false;

    async function loadBudgetData() {
      try {
        setError("");

        const [itineraryResponse, expensesResponse] = await Promise.all([
          apiRequest(`/trips/${selectedTripId}/itinerary`),
          apiRequest(`/trips/${selectedTripId}/expenses`),
        ]);

        if (cancelled) return;

        setActivities(
          Array.isArray(itineraryResponse)
            ? itineraryResponse
            : itineraryResponse?.content || []
        );

        setExpenses(
          Array.isArray(expensesResponse)
            ? expensesResponse
            : expensesResponse?.content || []
        );
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
              "Could not load itinerary or expenses for this trip."
          );
        }
      }
    }

    loadBudgetData();

    return () => {
      cancelled = true;
    };
  }, [selectedTripId]);

  async function addExpense(event) {
    event.preventDefault();

    if (!selectedTripId || !amount || Number(amount) <= 0) {
      setError("Select a trip and enter a valid expense amount.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const newExpense = await apiRequest(
        `/trips/${selectedTripId}/expenses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            amount: Number(amount),
            description,
            expenseDate,
          }),
        }
      );

      if (newExpense && newExpense.id != null) {
        setExpenses((current) => [...current, newExpense]);
      } else {
        const refreshed = await apiRequest(
          `/trips/${selectedTripId}/expenses`
        );

        setExpenses(
          Array.isArray(refreshed)
            ? refreshed
            : refreshed?.content || []
        );
      }

      setAmount("");
      setDescription("");
    } catch (err) {
      setError(err.message || "Could not save the expense.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="budget-page">
        <div className="budget-container">
          <header className="budget-page-header">
            <p className="budget-eyebrow">PLAN YOUR SPENDING</p>
            <h1>Trip Budget 💰</h1>
            <p>Track your planned costs and actual expenses in one place.</p>
          </header>

          {loading ? (
            <p className="budget-message">Loading your trips...</p>
          ) : trips.length === 0 ? (
            <section className="budget-empty">
              <h2>No trips found</h2>
              <p>Create a trip first to manage its budget.</p>
            </section>
          ) : (
            <>
              <section className="budget-trip-selector">
                <label htmlFor="budget-trip">Select your trip</label>

                <select
                  id="budget-trip"
                  value={selectedTripId}
                  onChange={(event) =>
                    setSelectedTripId(event.target.value)
                  }
                >
                  {trips.map((trip) => (
                    <option key={trip.id} value={String(trip.id)}>
                      {trip.title || trip.destination || `Trip ${trip.id}`}
                    </option>
                  ))}
                </select>
              </section>

              {error && (
                <div className="budget-error" role="alert">
                  {error}
                </div>
              )}

              {selectedTrip && (
                <BudgetSummary
                  budget={selectedTrip.budget ?? 0}
                  activities={activities}
                  expenses={expenses}
                />
              )}

              <section className="budget-expense-section">
                <h2>Add an Expense</h2>

                <form className="budget-expense-form" onSubmit={addExpense}>
                  <div className="budget-field">
                    <label htmlFor="expense-category">Category</label>
                    <select
                      id="expense-category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Accommodation</option>
                      <option>Activities</option>
                      <option>Shopping</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="budget-field">
                    <label htmlFor="expense-amount">Amount (₹)</label>
                    <input
                      id="expense-amount"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      required
                    />
                  </div>

                  <div className="budget-field">
                    <label htmlFor="expense-date">Date</label>
                    <input
                      id="expense-date"
                      type="date"
                      value={expenseDate}
                      onChange={(event) => setExpenseDate(event.target.value)}
                      required
                    />
                  </div>

                  <div className="budget-field">
                    <label htmlFor="expense-description">Description</label>
                    <input
                      id="expense-description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="e.g. Lunch"
                    />
                  </div>

                  <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Add Expense"}
                  </button>
                </form>
              </section>

              <section className="budget-expense-section">
                <h2>Expense History</h2>

                {expenses.length === 0 ? (
                  <p className="budget-message">
                    No expenses recorded for this trip yet.
                  </p>
                ) : (
                  <div className="budget-expense-list">
                    {expenses.map((expense, index) => (
                      <article
                        className="budget-expense-item"
                        key={expense.id ?? index}
                      >
                        <div>
                          <strong>
                            {expense.description || expense.category || "Expense"}
                          </strong>
                          <p>
                            {expense.category || "Other"}
                            {expense.expenseDate
                              ? ` · ${expense.expenseDate}`
                              : ""}
                          </p>
                        </div>

                        <strong>
                          ₹
                          {Number(expense.amount || 0).toLocaleString("en-IN")}
                        </strong>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
