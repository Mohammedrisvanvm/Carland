import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";

import CarManagement from "./CarManagement";
import NewNav from "../../../test/NewNav";
import NewSide from "../../../test/NewSide";
import React from "react";

const AdminCarManagementPage = () => {
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
        <CarManagement sidebarWidth={sidebarWidth} />
    
    </>
  );
};

export default AdminCarManagementPage;
