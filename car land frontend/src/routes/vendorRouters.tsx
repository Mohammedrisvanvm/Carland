import { Route, Routes } from "react-router";
import VendorHomePage from "../components/vender/venderHome/VendorHomePage";

import VenderDashboardPage from "../components/vender/venderDashboard/vendorDashboardpage";
import CarManagementPage from "../components/vender/venderCarManagementPage/carManagementPage";
import AddCarPage from "../components/vender/venderCarManagementPage/addCar/addCarPage";
import { VendorOtp } from "../components/vender/venderAuth/vendorOtp/vendorOtp";
import VendorSignUp from "../components/vender/venderAuth/vendorSignup/venderSignup";
import VenderLogin from "../components/vender/venderAuth/vendorLogin/vendorLogin";
import PrivateRoute from "../utils/PrivateRoute";
import AddHub from "../components/vender/vendorHub/AddHub";
import { useState } from "react";
import VendorNavBar from "../components/vender/vendorNavbar/vendorNavBar";
import ProtectedRouteVendor from "./protectedRoutes/vendor";
import VendorBooking from "../components/vender/vendorBookingManagement/Vendorbooking";


const VendorRouters = () => {
  const [nav, setNav] = useState(false);
 
  return (
    <>
      <Routes>
        <Route path="/login" element={<ProtectedRouteVendor > <VenderLogin /></ProtectedRouteVendor>} />
        <Route path="/signup" element={<ProtectedRouteVendor ><VendorSignUp /></ProtectedRouteVendor>} />
        <Route path="/otp" element={<ProtectedRouteVendor ><VendorOtp /></ProtectedRouteVendor>} />
        {/* <Route path="/" element={<AdminProtectRoute> <Home /> </AdminProtectRoute>}></Route> */}

        {/* <Route element={<PrivateRoute  />}> */}
          <Route path="/*" element={ <ProtectedRouteVendor > <VendorHomePage /> </ProtectedRouteVendor>} />
          <Route path="/addhub" element={ <ProtectedRouteVendor > <AddHub/> </ProtectedRouteVendor>} />
          {/* <Route path="/*" element={ <ProtectedRouteVendor > <VendorHomePage /> </ProtectedRouteVendor>} /> */}
          <Route path="/vendordashboard" element={<ProtectedRouteVendor > <VenderDashboardPage /></ProtectedRouteVendor>} />
          <Route path="/vendorcars" element={ <CarManagementPage />} />
          <Route path="/vendorbookings" element={ <VendorBooking/>} />
          <Route path="/vendorcar/addcar" element={<ProtectedRouteVendor > <AddCarPage /></ProtectedRouteVendor>} />
          {/* <Route path="/vendorhubs" element={<Dashboard />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default VendorRouters;
