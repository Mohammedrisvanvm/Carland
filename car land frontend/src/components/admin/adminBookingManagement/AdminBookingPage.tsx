import React from 'react'
import AdminNavBar from '../adminNav/adminNav';
import AdminAside from '../adminAside/adminAside';
import AdminBooking from './AdminBooking';

const AdminBookingPage = () => {
    const [sidebarWidth, setsidebarWidth] = React.useState<boolean>(true);
    const [spanVisible, setSpanVisible] = React.useState<boolean>(false);
  return (
  <>
  
  <AdminNavBar
        setSpanVisible={setSpanVisible}
        sidebarWidth={sidebarWidth}
        spanVisible={spanVisible}
        setsidebarWidth={setsidebarWidth}
      />
        <AdminAside spanVisible={spanVisible}/>
        <AdminBooking sidebarWidth={sidebarWidth}/>
  </>
  )
}

export default AdminBookingPage
