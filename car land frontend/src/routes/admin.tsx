import React from "react";
import { Route, Routes } from "react-router";
import AdminDashboard from "../components/admin/adminDashboard/Dashboard";

const AdminRouters = () => {
  return (
    <Routes>
      <Route path="/adminhome" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRouters;
