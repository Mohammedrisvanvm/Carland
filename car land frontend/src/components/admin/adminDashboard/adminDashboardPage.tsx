import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import AdminDashboard from "./Dashboard";
const AdminDashboardPage = () => {
  return (
    <>
      <AdminNavBar />
      <AdminAside value={{ Component: <AdminDashboard /> }} />
    
    </>
  );
};

export default AdminDashboardPage;
