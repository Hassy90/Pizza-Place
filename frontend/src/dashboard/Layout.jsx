import AdminPage from "./adminPage";
import {Outlet} from "react-router"

const Layout = () => {
    return<>
    <AdminPage/>
    <Outlet/>
    </>
};

export default Layout;