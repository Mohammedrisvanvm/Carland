import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserRoutes from "./routes/userRoutes";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "mapbox-gl/dist/mapbox-gl.css";

import AdminRouters from "./routes/adminRouters";
import VendorRouters from "./routes/vendorRouters";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRouters />} />
          <Route path="/vendor/*" element={<VendorRouters />} />
        </Routes>
      </BrowserRouter>

      {/* <Content /> */}
    </div>
  );
}

export default App;
