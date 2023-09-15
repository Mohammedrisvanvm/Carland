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


const VendorRouters = () => {
  const [nav, setNav] = useState(false);
 
  return (
    <>
      <Routes>
        <Route path="/login" element={<PrivateRoute role="vendor"> <VenderLogin /></PrivateRoute>} />
        <Route path="/signup" element={<PrivateRoute role="vendor"><VendorSignUp /></PrivateRoute>} />
        <Route path="/otp" element={<PrivateRoute role="vendor"><VendorOtp /></PrivateRoute>} />
        {/* <Route path="/" element={<AdminProtectRoute> <Home /> </AdminProtectRoute>}></Route> */}

        {/* <Route element={<PrivateRoute role="vendor" />}> */}
          <Route path="/*" element={ <PrivateRoute role="vendor"> <VendorHomePage /> </PrivateRoute>} />
          <Route path="/addhub" element={ <PrivateRoute role="vendor"> <AddHub/> </PrivateRoute>} />
          {/* <Route path="/*" element={ <PrivateRoute role="vendor"> <VendorHomePage /> </PrivateRoute>} /> */}
          <Route path="/vendordashboard" element={<PrivateRoute role="vendor"> <VenderDashboardPage /></PrivateRoute>} />
          <Route path="/vendorcars" element={<PrivateRoute role="vendor"> <CarManagementPage /></PrivateRoute>} />
          <Route path="/vendorcar/addcar" element={<PrivateRoute role="vendor"> <AddCarPage /></PrivateRoute>} />
          {/* <Route path="/vendorhubs" element={<Dashboard />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default VendorRouters;
