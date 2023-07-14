import { Banner } from "./components/banner/Banner"
import { LoginMainPage } from "./components/loginpage/LoginMainPage"
import { MainHeader } from "./components/userHeader/MainHeader/MainHeader"







function App() {
 

  return (
    <>
      <div className="w-screen h-screen bg-white-300">

<MainHeader/>
<Banner/>
<LoginMainPage/>

      </div>
       
    </>
  )
}

export default App
