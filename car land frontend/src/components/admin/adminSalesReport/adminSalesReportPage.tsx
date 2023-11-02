import React from "react";

import AdminSalesReport from "./adminSalesReport";
import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";

const AdminSalesReportPage = () => {
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
      <AdminSalesReport sidebarWidth={sidebarWidth} />
    </>
  );
};

export default AdminSalesReportPage;
