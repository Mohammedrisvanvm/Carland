import React, { useState } from "react";
import VendorNavBar from "../vendorNavbar/vendorNavBar";
import VendorAside from "../venderASide/vendorAside";
import CarList from "./Carlist";

const CarManagementPage = () => {
  return (
    <>
      <VendorNavBar />
      <VendorAside value={{ Component: <CarList /> }} />
    </>
  );
};

export default CarManagementPage;
