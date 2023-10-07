import { BrowserRouter, Route, Routes } from "react-router-dom";


import UserRoutes from "./routes/userRoutes";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'mapbox-gl/dist/mapbox-gl.css'



import AdminRouters from "./routes/adminRouters";
import VendorRouters from "./routes/vendorRouters";
import  Test  from "./test/test";
import { SetStateAction } from "react";

function App() {
 
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRouters />} />
          <Route path="/vendor/*" element={<VendorRouters />} />
          <Route path="/test" element={<Test setloading={function (value: SetStateAction<boolean>): void {
            throw new Error("Function not implemented.");
          } } loading={false} />} />
        </Routes>
      </BrowserRouter>

    
      {/* <Content /> */}
    </div>
);
}

export default App;
