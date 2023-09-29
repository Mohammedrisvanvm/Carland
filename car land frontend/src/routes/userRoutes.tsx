import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/loginpage/LoginPage'
import UserHomePage from '../components/HomePage/UserHomePage'
import SignUpPage from '../components/signupPage/signUpPage'
import GoogleAuthPage from '../components/googleAuthPage/GoogleAuthPage'
import OtpPage from '../components/OtpPage/OtpPage'
import AccountPage from '../components/user/profile/Pages'
import Pages from '../components/user/profile/Pages'
import LeftSide from '../components/user/profile/LeftSide'
import CitySelect from '../components/citySelect/CitySelect'
import { Content } from '../components/content/content'
import SingleVehicle from '../components/user/singlevehiclepage/SingleVehicle'

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/'  element={<UserHomePage/>}/>
                <Route path='/UserAuth' element={<GoogleAuthPage/>}/>
                <Route path='/UserLogin' element={<LoginPage/>}/>
                <Route path='/UserSignUp' element={<SignUpPage/>}/>
                <Route path='/UserOtp' element={<OtpPage/>}/>
                <Route path='/selectcity' element={<CitySelect/>}/>
                <Route path='/rentcars' element={<Content/>} />
                <Route path='/singlecar' element={<SingleVehicle/>} />
            <Route path='/profile' element={<LeftSide/>}/> 
            </Routes>
        </>
    )
}

export default UserRoutes
