import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import VendorManagement from "./vendorManagement";

const AdminVendorManagementPage = () => {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
        <AdminAside />
        <VendorManagement />
      </div>
    </>
  );
};

export default AdminVendorManagementPage;
