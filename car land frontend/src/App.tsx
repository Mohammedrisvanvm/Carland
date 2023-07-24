import { BrowserRouter, Route, Routes } from "react-router-dom";


import RentRouters from "./routes/rentrouters";
import UserRoutes from "./routes/userRoutes";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CabRouters from "./routes/cabRouters";
import { Box } from "./test/test";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/rent/*" element={<RentRouters />} />
          <Route path="/cab/*" element={<CabRouters />} />
          <Route path="/admin" element={<UserRoutes />} />
        </Routes>
      </BrowserRouter>

    
      {/* <Content /> */}
    </div>
  );
}

export default App;
