
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../Api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      // Some backends automatically log users in after registration.
      const token = data?.token || data?.accessToken;

      if (token) {
        localStorage.setItem("smarttripToken", token);

        if (data.user) {
          localStorage.setItem("smarttripUser", JSON.stringify(data.user));
        }

        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", {
          replace: true,
          state: { message: "Account created! Please log in." },
        });
      }
    } catch (err) {
      setError(err.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleRegister}>
        <h1>Create your account 🌍</h1>
        <p>Start building your personal travel plans.</p>

        {error && <p role="alert" className="auth-error">{error}</p>}

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}
