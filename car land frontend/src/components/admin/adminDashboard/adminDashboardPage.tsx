import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import AdminDashboard from "./Dashboard";
const AdminDashboardPage = () => {
  return (
    <>
      <AdminNavBar />
       <div className="flex">
      <AdminAside />
      <AdminDashboard />
      </div>
    </>
  );
};

export default AdminDashboardPage;
