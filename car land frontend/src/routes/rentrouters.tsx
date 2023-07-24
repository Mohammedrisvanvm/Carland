
import { Route, Routes } from 'react-router'
import { Content } from '../components/content/content'


const RentRouters = () => {
  return (
    <>
  <Routes>
<Route path='/renthome' element={<Content/>} />
  </Routes>

 
  </>
  )
}

export default RentRouters
