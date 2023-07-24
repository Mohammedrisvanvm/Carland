import React from 'react'
import { Route, Routes } from 'react-router'
import { Content } from '../components/content/content'

const rentrouters = () => {
  return (
  <Routes>
<Route path='/renthome' element={<Content/>} />
  </Routes>
  )
}

export default rentrouters
