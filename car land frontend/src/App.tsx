import { BrowserRouter, Route, Routes } from "react-router-dom";


import UserRoutes from "./routes/userRoutes";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'mapbox-gl/dist/mapbox-gl.css'



import AdminRouters from "./routes/adminRouters";
import VendorRouters from "./routes/vendorRouters";
import  Test  from "./test/test";
import { SetStateAction } from "react";
import Newadmin from "./test/newadmin";
import VendorChat from "./test/vendorChat";
import SingleCar from "./test/SingleCar";

function App() {
 
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRouters />} />
          <Route path="/vendor/*" element={<VendorRouters />} />
          {/* <Route path="/test" element={<Test />} /> */}
           <Route path="/new" element={<Newadmin />} />
           <Route path="/chat" element={<VendorChat />} />
           <Route path="/bug" element={<SingleCar />} />
        </Routes>
      </BrowserRouter>

    
      {/* <Content /> */}
    </div>
);
}

export default App;
