import React from "react";
import Dashboard from "../components/Admin/Dashboard";
import { Navigate } from "react-router-dom";

export default function AdminRoutes() {
  let role = sessionStorage.getItem("role");
  let token = sessionStorage.getItem("token");

  const admin = role === "admin" && token ? true : null;

  return admin ? <Dashboard /> : <Navigate to="/" />;
}
