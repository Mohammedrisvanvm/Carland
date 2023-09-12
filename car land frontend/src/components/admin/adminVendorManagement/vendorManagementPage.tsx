import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import VendorManagement from "./vendorManagement";

const AdminUserManagementPage = () => {
  return (
    <>
      <AdminNavBar />
      <AdminAside value={{ Component: <VendorManagement /> }} />
    </>
  );
};

export default AdminUserManagementPage;