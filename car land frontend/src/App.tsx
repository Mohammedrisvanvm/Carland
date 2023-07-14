import { Banner } from "./components/banner/Banner"
import { LoginMainPage } from "./components/loginpage/LoginMainPage"
import { HAI } from "./components/loginpage/loginform/HAI"
import { LoginForm } from "./components/loginpage/loginform/LoginForm"
import { Otp } from "./components/loginpage/loginform/Otp"
import { MainHeader } from "./components/userHeader/MainHeader/MainHeader"




t5r


function App() {
 

  return (
    <>
      <div className="w-screen h-screen bg-white-300">

<MainHeader/>
<Banner/>
<LoginMainPage/>
<LoginForm/>
<HAI/>
<Otp/>

      </div>
       
    </>
  )
}

export default App
