import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import HubManagement from "./hubManagement";

const AdminHubManagementPage = () => {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
        <AdminAside />
        <HubManagement />
      </div>
    </>
  );
};

export default AdminHubManagementPage;
