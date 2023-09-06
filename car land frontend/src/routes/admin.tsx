import React from "react";
import { Route, Routes } from "react-router";
import AdminDashboard from "../components/admin/adminDashboard/Dashboard";
import AdminLogin from "../components/admin/adminauth/adminLogin";

const AdminRouters = () => {
  return (
    <Routes>
      <Route path="/adminhome" element={<AdminDashboard />} />
      <Route path="/login" element={<AdminLogin/>} />
    </Routes>
  );
};

export default AdminRouters;
