import React from 'react'
import { Route, Routes } from 'react-router'
import { Content } from '../components/content/content'

const cabRouters = () => {
  return (
   <Routes>
<Route path='/cabhome' element={<Content/>}/>
   </Routes>
  )
}

export default cabRouters
