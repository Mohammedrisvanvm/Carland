import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";

import CarManagement from "./CarManagement";

const AdminCarManagementPage = () => {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
        <AdminAside />
        <CarManagement />
      </div>
    </>
  );
};

export default AdminCarManagementPage;
