import React from "react";
import VendorAside from "../venderASide/vendorAside";
import VendorNavBar from "../vendorNavbar/vendorNavBar";
import VendorProfile from "./VendorProfile";


const VendorProfilePage = () => {
  const [sidebarWidth, setsidebarWidth] = React.useState<boolean>(true);
  const [spanVisible, setSpanVisible] = React.useState<boolean>(false);
  return (
    <>
      <VendorNavBar
        setSpanVisible={setSpanVisible}
        sidebarWidth={sidebarWidth}
        spanVisible={spanVisible}
        setsidebarWidth={setsidebarWidth}
      />
      <VendorAside spanVisible={spanVisible} />
      <VendorProfile sidebarWidth={sidebarWidth} />
    </>
  );
};

export default VendorProfilePage;
