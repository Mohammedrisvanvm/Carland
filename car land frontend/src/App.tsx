import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Content } from "./components/content/content"

import UserRoutes from "./routes/userRoutes"
import Basic from "./test/test"
import { ToastContainer } from "react-toastify"


function App() {


  return (
    <>
   <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />





        </Routes>



      </BrowserRouter>


{/* <Basic/> */}


        <Content />

  
      
    </>
  )
}

export default App
