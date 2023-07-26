
import VenderNavBar from '../vendorNavbar/venderNavBar'
import VenderAside from '../venderASide/vendorAside'
import VenderDashboard from "./VenderDashboard";
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
