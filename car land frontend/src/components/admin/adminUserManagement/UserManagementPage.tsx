import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";

import UserManagement from "./UserManagement";
const AdminUserManagementPage = () => {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
      <AdminAside />

      <UserManagement />
      </div>
    </>
  );
};

export default AdminUserManagementPage;
