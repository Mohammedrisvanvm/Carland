import React from 'react'
import NewNav from "../../../test/NewNav";
import NewSide from "../../../test/NewSide";
import HubManagement from "./hubManagement";

const AdminHubManagementPage = () => {
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
        <HubManagement sidebarWidth={sidebarWidth}/>
    
    </>
  );
};

export default AdminHubManagementPage;
