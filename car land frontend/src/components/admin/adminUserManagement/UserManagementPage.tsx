import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";

import UserManagement from "./UserManagement";
const AdminUserManagementPage = () => {
  return (
    <>
      <AdminNavBar />
      <AdminAside value={{ Component: <UserManagement /> }} />
    
    </>
  );
};

export default AdminUserManagementPage;