import React from "react";
import { Route, Routes } from "react-router";
import AdminDashboard from "../components/admin/adminDashboard/Dashboard";
import AdminLogin from "../components/admin/adminauth/adminLogin";
import PrivateRoute from "../utils/PrivateRoute";

const AdminRouters = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute role={"admin"} route={"/admin"} />}>
        <Route path="/adminhome" element={<AdminDashboard />} />
    
      </Route>
      <Route path="/*" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRouters;
