import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";

import CarManagement from "./CarManagement";

import React from "react";

const AdminCarManagementPage = () => {
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
        <AdminAside spanVisible={spanVisible}/>
        <CarManagement sidebarWidth={sidebarWidth} />
    
    </>
  );
};

export default AdminCarManagementPage;
