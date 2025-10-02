import {Link} from "react-router"
import { Outlet } from "react-router";
import "../dashboard/adminCss/AdminPage.css"

const AdminPage = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">DashBoard</h2>
        <nav>
          <ul>
  <li><Link to="/adminlogin">Login</Link></li>  
  <li><Link to="/adminpage/adminsetting">Setting</Link></li>
  <li><Link to="/adminpage/admincategory">Category</Link></li>
  <li><Link to="/adminpage/adminproducts">Products</Link></li>
  <li><Link to="/adminpage/allorders">Orders</Link></li>
</ul>
        </nav> 
        
      </aside>

      <main className="dashboard-content">
        <h3>Welcome</h3>
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPage;
