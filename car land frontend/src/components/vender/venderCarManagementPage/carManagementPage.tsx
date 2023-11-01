import React, { useState } from "react";
import VendorNavBar from "../vendorNavbar/vendorNavBar";
import VendorAside from "../venderASide/vendorAside";
import CarList from "./Carlist";


const CarManagementPage = () => {
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
      <CarList sidebarWidth={sidebarWidth} />
    </>
  );
};

export default CarManagementPage;
