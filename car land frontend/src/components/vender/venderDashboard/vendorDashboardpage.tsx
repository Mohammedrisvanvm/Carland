import VenderNavBar from "../vendorNavbar/vendorNavBar";
import VenderAside from "../venderASide/vendorAside";
import VenderDashboard from "./vendorDashboard";
const VenderDashboardPage = () => {
  return (
    <>
      <VenderNavBar />
      <VenderAside />
      <div className="sm:ml-64">
      <VenderDashboard /></div>
    </>
  );
};

export default VenderDashboardPage;
