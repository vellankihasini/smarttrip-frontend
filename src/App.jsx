
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import Budget from "./pages/Budget";
import Explore from "./pages/Explore";
import SavedTrips from "./pages/SavedTrips";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ProtectedRoute() {
  const token = localStorage.getItem("smarttripToken");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function PrivateLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Explore can be viewed without logging in */}
        <Route
          path="/explore"
          element={
            <>
              <Navbar />
              <Explore />
              <Footer />
            </>
          }
        />

        {/* Login required */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/saved-trips" element={<SavedTrips />} />
          </Route>
        </Route>

        {/* Unknown pages */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
