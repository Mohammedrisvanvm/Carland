
import { Route, Routes } from 'react-router'
import { Content } from '../components/content/content'
import  CitySelect  from '../components/citySelect/CitySelect'


const RentRouters = () => {
  return (
    <>
  <Routes>
<Route path='/renthome' element={<CitySelect/>} />
<Route path='/rentcars' element={<Content/>} />
  </Routes>

 
  </>
  )
}

export default RentRouters
