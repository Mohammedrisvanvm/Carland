import { BrowserRouter, Route, Routes } from "react-router-dom";


import UserRoutes from "./routes/userRoutes";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'mapbox-gl/dist/mapbox-gl.css'



import AdminRouters from "./routes/admin";
import VendorRouters from "./routes/vendorRouters";
import { Content } from "./test/test";

function App() {
 
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRouters />} />
          <Route path="/vendor/*" element={<VendorRouters />} />
          <Route path="/test" element={<Content />} />
        </Routes>
      </BrowserRouter>

    
      {/* <Content /> */}
    </div>
);
}

export default App;
