import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Content } from "./components/content/content"

import UserRoutes from "./routes/userRoutes"
import Basic from "./test/test"


function App() {


  return (
    <>
   
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />





        </Routes>



      </BrowserRouter>


<Basic/>


        <Content />

  

    </>
  )
}

export default App
