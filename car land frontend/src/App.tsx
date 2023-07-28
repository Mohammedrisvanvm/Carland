import { BrowserRouter, Route, Routes } from "react-router-dom";


import UserRoutes from "./routes/userRoutes";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CabRouters from "./routes/cabRouters";

import RentRouters from "./routes/rentRouters";
import AdminRouters from "./routes/admin";
import VendorRouters from "./routes/venderRouters";
import axios from "axios";

function App() {
  axios.defaults.withCredentials=true;
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/rent/*" element={<RentRouters />} />
          <Route path="/cab/*" element={<CabRouters />} />
          <Route path="/admin/*" element={<AdminRouters />} />
          <Route path="/vendor/*" element={<VendorRouters />} />
        </Routes>
      </BrowserRouter>

    
      {/* <Content /> */}
    </div>
);
}

export default App;
