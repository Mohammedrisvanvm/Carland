import React from 'react'
import VendorNavBar from '../vendorNavbar/vendorNavBar';
import VendorAside from '../venderASide/vendorAside';
import VendorSalesReport from './VendorSalesReport';

const VendorSalesReportPage = () => {

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
        <VendorSalesReport sidebarWidth={sidebarWidth} />
      </>
    )
}

export default VendorSalesReportPage
