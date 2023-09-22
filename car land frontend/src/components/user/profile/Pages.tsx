

  import React,{FC} from 'react'
import LeftSide from './LeftSide'
import MyAccount from './MyAccount'
import ProfileVerification from './ProfileVerification'
  
interface MyComponentProps {
    role: string
  
  }
  const Pages:FC<MyComponentProps> = ({role}:MyComponentProps) => {
    return (
     <>
     {role === 'Account' ? (
       <MyAccount />
      ) : null}
     {role === 'Verification' ? (
       <ProfileVerification /> 
      ) : null}
     </>
    )
  }
  
  export default Pages
  