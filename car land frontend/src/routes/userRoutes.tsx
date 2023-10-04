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
import Payment from '../components/user/payment/Payment'
import BookingConfirmPage from '../components/user/payment/BookingConfirmPage'
import PrivateRoute from '../utils/PrivateRoute'
import ProtectedRouteuser from './protectedRoutes/user'

const UserRoutes = () => {
    return (
        <>
            <Routes>
                
                <Route path='/'  element={<UserHomePage/>}/>
                <Route path='/userauth' element={<ProtectedRouteuser role='user'><GoogleAuthPage/></ProtectedRouteuser>}/>
                <Route path='/userlogin' element={<ProtectedRouteuser role='user'><LoginPage/></ProtectedRouteuser>}/>
                <Route path='/usersignup' element={<ProtectedRouteuser role='user'><SignUpPage/></ProtectedRouteuser>}/>
                <Route path='/userotp' element={<ProtectedRouteuser role='user'><OtpPage/></ProtectedRouteuser>}/>
                <Route path='/selectcity' element={<CitySelect/>}/>
                <Route path='/rentcars' element={<Content/>} />
                <Route path='/singlecar' element={<SingleVehicle/>} />
            <Route path='/profile' element={<ProtectedRouteuser role='user'><LeftSide/></ProtectedRouteuser>}/> 
            <Route path="/BookingConfirm/:id" element={<ProtectedRouteuser role='user'><BookingConfirmPage/></ProtectedRouteuser>} />
            </Routes>
        </>
    )
}

export default UserRoutes
