import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";

import UserManagement from "./UserManagement";
import React from "react";
import NewNav from "../../../test/NewNav";
import NewSide from "../../../test/NewSide";
const AdminUserManagementPage = () => {
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
        <UserManagement sidebarWidth={sidebarWidth}/>
    
  
    </>
  );
};

export default AdminUserManagementPage;
