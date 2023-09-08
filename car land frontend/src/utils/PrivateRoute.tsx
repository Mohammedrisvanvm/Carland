import React,{useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
interface props{
    role:string,
    route:string
}

function PrivateRoute(props:props) {

    const [auth,setAuth]=useState(false)
  
  return (
    <>
    {auth ? <Outlet/> : <Navigate to={props.route}/>}
    </>
  )
}

export default PrivateRoute
