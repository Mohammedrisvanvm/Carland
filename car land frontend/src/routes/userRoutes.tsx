import { Route, Routes } from 'react-router-dom'
import { LoginMainPage } from '../components/loginpage/LoginMainPage'
import UserHomePage from '../components/HomePage/UserHomePage'

const UserRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/'  element={<UserHomePage/>}/>
                <Route path='/UserAuth' element={<LoginMainPage/>}/>
               
            </Routes>
        </>
    )
}

export default UserRoutes
