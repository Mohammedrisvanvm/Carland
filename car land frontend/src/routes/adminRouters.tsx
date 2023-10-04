import React from "react";
import { Route, Routes } from "react-router";
import AdminDashboard from "../components/admin/adminDashboard/Dashboard";
import AdminLogin from "../components/admin/adminauth/adminLogin";
import PrivateRoute from "../utils/PrivateRoute";
import { useAppSelector } from "../redux/store/storeHook";
import AdminDashboardPage from "../components/admin/adminDashboard/adminDashboardPage";
import AdminUserManagementPage from "../components/admin/adminUserManagement/UserManagementPage";
import AdminVendorManagementPage from "../components/admin/adminVendorManagement/vendorManagementPage";
import AdminHubManagementPage from "../components/admin/adminHubManagement/hubManagementPage";
import AdminCarManagementPage from "../components/admin/adminCarManagement/CarManagementPage";

const AdminRouters = () => {
  const { admin } = useAppSelector((state) => state);
  return (
    <Routes>
      {admin.email && (
        <>
          <Route path="/*" element={ <PrivateRoute role="admin"><AdminDashboardPage/></PrivateRoute>} />
          <Route path="/usermanagement" element={ <PrivateRoute role="admin"><AdminUserManagementPage /></PrivateRoute>} />
          <Route path="/vendormanagement" element={ <PrivateRoute role="admin"><AdminVendorManagementPage /></PrivateRoute>} />
          <Route path="/hubmanagement" element={ <PrivateRoute role="admin"><AdminHubManagementPage /></PrivateRoute>} />
          <Route path="/carmanagement" element={ <PrivateRoute role="admin"><AdminCarManagementPage /></PrivateRoute>} />
        </>
      )}
      {admin.email === null && (
        <>
          <Route path="/login" element={ <PrivateRoute role="admin"><AdminLogin /></PrivateRoute>} />
        </>
      )}

      {/* <Route element={<PrivateRoute role={"admin"}  />}> */}

      {/* </Route> */}
    </Routes>
  );
};

export default AdminRouters;
