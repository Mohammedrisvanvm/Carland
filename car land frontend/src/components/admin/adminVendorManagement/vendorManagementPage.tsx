import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import VendorManagement from "./vendorManagement";
import React from 'react'
import NewNav from "../../../test/NewNav";
import NewSide from "../../../test/NewSide";
const AdminVendorManagementPage = () => {
  const [sidebarWidth, setsidebarWidth] = React.useState<boolean>(true);
  const [spanVisible, setSpanVisible] = React.useState<boolean>(false);
  return (
    <>
    <NewNav
        setSpanVisible={setSpanVisible}
        sidebarWidth={sidebarWidth}
        spanVisible={spanVisible}
        setsidebarWidth={setsidebarWidth}
      />
        <NewSide spanVisible={spanVisible}/>
        <VendorManagement sidebarWidth={sidebarWidth}/>
     
    </>
  );
};

export default AdminVendorManagementPage;
