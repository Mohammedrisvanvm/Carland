import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Content } from "./components/content/content"
import { LoginMainPage } from "./components/loginpage/LoginMainPage"



import UserHomePage from "./components/HomePage/UserHomePage"









function App() {
 

  return (
    <>
<BrowserRouter>
<Routes>
<Route path="/" element={<UserHomePage/>}/>
<Route path="/login" element={<LoginMainPage/>}/>




</Routes>



</BrowserRouter>

      <div className="w-screen h-screen bg-white-300">



<Content/>

      </div>
       
    </>
  )
}

export default App
