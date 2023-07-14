import { Banner } from "./components/banner/Banner"
import { Content } from "./components/content/content"
import { LoginMainPage } from "./components/loginpage/LoginMainPage"
import { HAI } from "./components/loginpage/loginform/HAI"
import { LoginForm } from "./components/loginpage/loginform/LoginForm"
import { Otp } from "./components/loginpage/loginform/Otp"
import { ServiceSelection } from "./components/serviceSelectionBoxes/serviceSelection"
import { MainHeader } from "./components/userHeader/MainHeader/MainHeader"







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
<Content/>
<ServiceSelection/>

      </div>
       
    </>
  )
}

export default App
