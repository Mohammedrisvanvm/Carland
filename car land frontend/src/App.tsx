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
import { Content } from "./test/SingleCar";
import NewNav from "./test/NewNav";
import NewSide from "./test/NewSide";
import Newpage from "./test/Newpage";
import NewSide1 from "./test/NewSide1";

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
           <Route path="/bug" element={<Content />} />
           {/* <Route path="/newnav" element={<NewNav />} /> */}
           {/* <Route path="/newside1" element={<NewSide1 />} /> */}
           <Route path="/newpage" element={<Newpage />} />
        </Routes>
      </BrowserRouter>

    
      {/* <Content /> */}
    </div>
);
}

export default App;
