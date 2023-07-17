import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Content } from "./components/content/content"

import UserRoutes from "./routes/userRoutes"
import { LoginHeader } from "./components/userHeader/loginHeader/loginHeader"

function App() {


  return (
    <>
    <LoginHeader/>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />





        </Routes>



      </BrowserRouter>

      <div className="w-screen h-screen bg-white-300">



        <Content />

      </div>

    </>
  )
}

export default App
