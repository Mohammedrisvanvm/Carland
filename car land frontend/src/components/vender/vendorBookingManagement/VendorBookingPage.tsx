import React from "react";
import VendorAside from "../venderASide/vendorAside";
import VendorNavBar from "../vendorNavbar/vendorNavBar";
import VendorBooking from "./Vendorbooking";

const VendorBookingPage = () => {
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
      <VendorBooking sidebarWidth={sidebarWidth} />
    </>
  );
};

export default VendorBookingPage;
