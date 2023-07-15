import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Content } from "./components/content/content"
import { LoginMainPage } from "./components/loginpage/LoginMainPage"

import { LoginForm } from "./components/loginpage/loginform/LoginForm"
import { Otp } from "./components/loginpage/loginform/Otp"

import UserHomePage from "./components/HomePage/UserHomePage"
import { SignIn } from "./components/loginpage/loginform/signIn"








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


<LoginForm/>
<SignIn/>
<Otp/>
<Content/>

      </div>
       
    </>
  )
}

export default App
