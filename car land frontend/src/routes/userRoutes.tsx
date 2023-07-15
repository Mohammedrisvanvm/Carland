import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../components/loginpage/LoginPage'
import UserHomePage from '../components/HomePage/UserHomePage'
import { Otp } from '../components/authPage/otp/Otp'

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/'  element={<UserHomePage/>}/>
                <Route path='/UserAuth' element={<LoginPage/>}/>
                <Route path='/UserLogin' element={<LoginPage/>}/>
                <Route path='/UserSignUp' element={<LoginPage/>}/>
                <Route path='/UserOtp' element={<Otp/>}/>
               
            </Routes>
        </>
    )
}

export default UserRoutes
