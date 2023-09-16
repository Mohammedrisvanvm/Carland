import React, { useState } from "react";
import VendorNavBar from "../vendorNavbar/vendorNavBar";
import VendorAside from "../venderASide/vendorAside";
import CarList from "./Carlist";

const CarManagementPage = () => {
  return (
    <>
      <VendorNavBar />
      <VendorAside  />
      <div className="sm:ml-64"> <CarList /> </div>
     
    </>
  );
};

export default CarManagementPage;
