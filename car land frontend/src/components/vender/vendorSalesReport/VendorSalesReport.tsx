import React from 'react'
import VendorNavBar from '../vendorNavbar/vendorNavBar';
import VendorAside from '../venderASide/vendorAside';
import SalesReport from '../../../test/SalesReport';

const VendorSalesReport = () => {

    const [sidebarWidth, setsidebarWidth] = React.useState<boolean>(true);
    const [spanVisible, setSpanVisible] = React.useState<boolean>(false);
    return (
      <>
        <VendorNavBar
          setSpanVisible={setSpanVisible}
          sidebarWidth={sidebarWidth}
          spanVisible={spanVisible}
          setsidebarWidth={setsidebarWidth}
        />
        <VendorAside spanVisible={spanVisible} />
        <SalesReport sidebarWidth={sidebarWidth} />
      </>
    )
}

export default VendorSalesReport
