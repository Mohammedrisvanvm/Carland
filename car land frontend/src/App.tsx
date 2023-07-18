import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Content } from "./components/content/content"

import UserRoutes from "./routes/userRoutes"
import Basic from "./test/test"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"


function App() {


  return (
  
      <div>


        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />





          </Routes>



        </BrowserRouter>


        {/* <Basic/> */}


        <Content />


      </div>

  )
}

export default App
