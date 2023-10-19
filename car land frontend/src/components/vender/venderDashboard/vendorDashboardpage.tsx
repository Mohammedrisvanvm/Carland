import VenderNavBar from "../vendorNavbar/vendorNavBar";
import VenderAside from "../venderASide/vendorAside";
import VenderDashboard from "./vendorDashboard";
import React from "react";
const VenderDashboardPage = () => {
  const [spanVisible, setSpanVisible] = React.useState<boolean>(false);
  return (
    <>
     
      <VenderAside spanVisible={spanVisible} />
      <div className="sm:ml-64">
      <VenderDashboard /></div>
    </>
  );
};

export default VenderDashboardPage;
