import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/loginpage/LoginPage'
import UserHomePage from '../components/HomePage/UserHomePage'
import SignUpPage from '../components/signupPage/signUpPage'
import GoogleAuthPage from '../components/googleAuthPage/GoogleAuthPage'
import OtpPage from '../components/OtpPage/OtpPage'

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/'  element={<UserHomePage/>}/>
                <Route path='/UserAuth' element={<GoogleAuthPage/>}/>
                <Route path='/UserLogin' element={<LoginPage/>}/>
                <Route path='/UserSignUp' element={<SignUpPage/>}/>
                <Route path='/UserOtp' element={<OtpPage/>}/>
               
            </Routes>
        </>
    )
}

export default UserRoutes
