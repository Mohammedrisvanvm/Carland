import React from 'react'
import NewNav from "../../../test/NewNav";
import NewSide from "../../../test/NewSide";
import HubManagement from "./hubManagement";
import AdminNavBar from '../adminNav/adminNav';
import AdminAside from '../adminAside/adminAside';

const AdminHubManagementPage = () => {
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
        <HubManagement sidebarWidth={sidebarWidth}/>
    
    </>
  );
};

export default AdminHubManagementPage;
