import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Installation from "./pages/Installation";
import ServiceMaintenance from "./pages/ServiceMaintenance";
import AboutCompany from "./pages/AboutCompany";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/installation" element={<Installation />} />
        <Route path="/service-maintenance" element={<ServiceMaintenance />} />
        <Route path="/about-company" element={<AboutCompany />} />
      </Routes>
    </Router>
  );
}
