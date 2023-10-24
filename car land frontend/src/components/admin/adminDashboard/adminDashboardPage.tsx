import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import AdminDashboard from "./Dashboard";
import React from "react";
const AdminDashboardPage = () => {
  const [sidebarWidth, setsidebarWidth] = React.useState<boolean>(true);
  const [spanVisible, setSpanVisible] = React.useState<boolean>(false);
  return (
    <>
      <AdminNavBar
        setSpanVisible={setSpanVisible}
        sidebarWidth={sidebarWidth}
        spanVisible={spanVisible}
        setsidebarWidth={setsidebarWidth}
      />
      <AdminAside spanVisible={spanVisible} />
      <AdminDashboard sidebarWidth={sidebarWidth} />
    </>
  );
};

export default AdminDashboardPage;
