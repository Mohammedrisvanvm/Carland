import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Content } from "./components/content/content"

import UserRoutes from "./routes/userRoutes"


function App() {


  return (
    <>
   
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />





        </Routes>



      </BrowserRouter>





        <Content />

  

    </>
  )
}

export default App
