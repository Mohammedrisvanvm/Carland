
import VenderNavBar from '../vendorNavbar/vendorNavBar'
import VenderAside from '../venderASide/vendorAside'
import VenderDashboard from "./vendorDashboard";
const VenderDashboardPage = () => {
 
  return (
    <>
      <VenderNavBar/>
    <VenderAside value={{Component:<VenderDashboard/>}}/>
    {/* <VenderDashboard/> */}
    </> 
  );
};

export default VenderDashboardPage;
