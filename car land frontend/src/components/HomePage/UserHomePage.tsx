
import { MainHeader } from '../userHeader/MainHeader/MainHeader'
import { Banner } from '../banner/Banner'
import { ServiceSelection } from '../authPage/serviceSelectionBoxes/serviceSelection'
import { UserFooter } from '../userFooter/userFooter'

const UserHomePage = () => {
  return (
    <>
    <MainHeader/>
    <Banner/>
    <ServiceSelection/>
    <UserFooter/>
    </>
  )
}

export default UserHomePage
