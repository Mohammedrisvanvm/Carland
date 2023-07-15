import { Route, Routes } from 'react-router-dom'
import LoginPage from '../components/loginpage/LoginPage'
import UserHomePage from '../components/HomePage/UserHomePage'
import { Otp } from '../components/authPage/otp/Otp'
import SignUpPage from '../components/signupPage/signUpPage'
import GoogleAuthPage from '../components/googleAuthPage/GoogleAuthPage'

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/'  element={<UserHomePage/>}/>
                <Route path='/UserAuth' element={<GoogleAuthPage/>}/>
                <Route path='/UserLogin' element={<LoginPage/>}/>
                <Route path='/UserSignUp' element={<SignUpPage/>}/>
                <Route path='/UserOtp' element={<Otp/>}/>
               
            </Routes>
        </>
    )
}

export default UserRoutes
