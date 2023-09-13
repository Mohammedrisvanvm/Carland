import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import HubManagement from "./hubManagement";


const AdminHubManagementPage = () => {
  return (
    <>
      <AdminNavBar />
      <AdminAside value={{ Component: <HubManagement /> }} />
    </>
  );
};

export default AdminHubManagementPage;
